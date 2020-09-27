import * as Yup from 'yup';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';
import NewDeliveryMail from '../jobs/NewDeliveryMail';
import Queue from '../../lib/Queue';

class DeliveryController {
    async index(req, res) {
        const delivery = await Delivery.findAll({
            include: [
                {
                    model: File,
                    as: 'signature',
                    attributes: ['id', 'path', 'url'],
                },
            ],
        });

        return res.json(delivery);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            recipient_id: Yup.number().required(),
            deliveryman_id: Yup.number().required(),
            product: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { recipient_id, deliveryman_id, product } = req.body;

        const recipient = await Recipient.findByPk(recipient_id, {
            attributes: [
                'id',
                'name',
                'street',
                'number',
                'complement',
                'state',
                'city',
                'postcode',
            ],
        });

        const deliveryman = await Deliveryman.findByPk(deliveryman_id, {
            attributes: ['id', 'name', 'email'],
        });

        if (!recipient) {
            return res.status(400).json({ error: 'Recipient does not exists' });
        }

        if (!deliveryman) {
            return res
                .status(400)
                .json({ error: 'Deliveryman does not exists' });
        }

        const delivery = await Delivery.create({
            recipient_id,
            deliveryman_id,
            product,
        });

        await Queue.add(NewDeliveryMail.key, {
            delivery,
            recipient,
            deliveryman,
        });

        return res.json(delivery);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            recipient_id: Yup.number(),
            deliveryman_id: Yup.number(),
            product: Yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { recipient_id, deliveryman_id, product } = req.body;

        const delivery = await Delivery.findByPk(req.params.id);

        const recipientExists = await Recipient.findOne({
            where: { id: recipient_id },
        });

        const deliveryExists = await Deliveryman.findOne({
            where: { id: deliveryman_id },
        });

        if (!recipientExists) {
            return res.status(400).json({ error: 'Recipient does not exists' });
        }

        if (!deliveryExists) {
            return res
                .status(400)
                .json({ error: 'Deliveryman does not exists' });
        }

        await delivery.update({
            recipient_id,
            deliveryman_id,
            product,
        });

        return res.json(delivery);
    }

    async delete(req, res) {
        const delivery = await Delivery.findByPk(req.params.id);

        await delivery.update({
            canceled_at: new Date(),
        });

        return res.json({ message: 'Delivery was cancelled with success' });
    }
}

export default new DeliveryController();
