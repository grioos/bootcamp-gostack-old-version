import * as Yup from 'yup';

import Delivery from '../models/Delivery';
import DeliveryProblem from '../models/DeliveryProblem';
import Deliveryman from '../models/Deliveryman';
import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class DeliveryProblemController {
    async index(req, res) {
        const deliveryProblem = await DeliveryProblem.findAll();

        return res.json(deliveryProblem);
    }

    async show(req, res) {
        const deliveryProblem = await DeliveryProblem.findOne({
            where: {
                delivery_id: req.params.id,
            },
        });

        if (!deliveryProblem) {
            return res
                .status(400)
                .json({ error: 'Delivery does not has problems' });
        }

        return res.json(deliveryProblem);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            description: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const delivery = await Delivery.findByPk(req.params.id);

        if (!delivery) {
            return res.status(400).json({ errror: 'Delivery does not exists' });
        }

        const deliveryProblem = await DeliveryProblem.create({
            delivery_id: req.params.id,
            description: req.body.description,
        });

        return res.json(deliveryProblem);
    }

    async delete(req, res) {
        const deliveryProblem = await DeliveryProblem.findByPk(req.params.id);

        if (!deliveryProblem) {
            return res
                .status(400)
                .json({ error: 'Delivery does not has problems' });
        }

        const delivery = await Delivery.findOne({
            where: { id: deliveryProblem.delivery_id },
        });

        if (!delivery) {
            return res.status(400).json({ error: 'Delivery does not exists' });
        }

        const deliveryman = await Deliveryman.findByPk(
            delivery.deliveryman_id,
            {
                attributes: ['id', 'name', 'email'],
            }
        );

        if (!deliveryman) {
            return res
                .status(400)
                .json({ error: 'Deliveryman does not exists ' });
        }

        await delivery.update({
            canceled_at: new Date(),
        });

        await Queue.add(CancellationMail.key, {
            deliveryman,
            deliveryProblem,
            delivery,
        });

        return res.json(delivery);
    }
}

export default new DeliveryProblemController();
