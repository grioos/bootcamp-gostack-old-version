import { Op } from 'sequelize';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';

class DeliverymanDeliveryController {
    async index(req, res) {
        const deliveryman = await Deliveryman.findByPk(req.params.id);

        if (!deliveryman) {
            return res
                .status(400)
                .json({ error: 'Deliveryman does not exists' });
        }

        const { delivered } = req.query;

        const delivery = await Delivery.findAll({
            where: {
                deliveryman_id: deliveryman.id,
                canceled_at: null,
                end_date:
                    delivered === 'true'
                        ? {
                              [Op.ne]: null,
                          }
                        : null,
            },
        });

        return res.json(delivery);
    }
}

export default new DeliverymanDeliveryController();
