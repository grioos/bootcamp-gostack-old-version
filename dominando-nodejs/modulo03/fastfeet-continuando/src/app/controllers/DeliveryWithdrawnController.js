import {
    startOfHour,
    setHours,
    isWithinInterval,
    startOfDay,
    endOfDay,
} from 'date-fns';
import { Op } from 'sequelize';

import Delivery from '../models/Delivery';

class DeliveryWithdrawnController {
    async update(req, res) {
        const delivery = await Delivery.findByPk(req.params.id, {
            where: {
                canceled_at: null,
                end_date: null,
            },
        });

        if (!delivery) {
            return res.status(400).json({ error: 'Delivery does not exists' });
        }

        const currentDate = new Date();

        const deliverymanCount = await Delivery.findAndCountAll({
            where: {
                deliveryman_id: delivery.deliveryman_id,
                start_date: {
                    [Op.between]: [
                        startOfDay(currentDate),
                        endOfDay(currentDate),
                    ],
                },
            },
        });

        console.log(deliverymanCount);

        if (
            !isWithinInterval(currentDate, {
                start: startOfHour(setHours(currentDate, 8)),
                end: startOfHour(setHours(currentDate, 18)),
            })
        )
            return res.status(401).json({
                error:
                    'Deliveries can be only withdrawn between 8:00h - 18:00h',
            });

        if (deliverymanCount.count > 5) {
            return res.status(401).json({
                error:
                    "You've reached your max number of withdrawns in one day",
            });
        }

        await delivery.update({
            start_date: currentDate,
        });

        return res.json(delivery);
    }
}

export default new DeliveryWithdrawnController();
