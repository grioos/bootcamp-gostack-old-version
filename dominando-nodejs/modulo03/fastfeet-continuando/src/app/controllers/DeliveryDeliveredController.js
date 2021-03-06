import { startOfHour, setHours, isWithinInterval } from 'date-fns';

import Delivery from '../models/Delivery';
import File from '../models/File';

class DeliveryDeliveredController {
    async update(req, res) {
        const { originalname: name, filename: path } = req.file;

        const newFile = await File.create({
            name,
            path,
        });

        const delivery = await Delivery.findByPk(req.params.id);

        if (!delivery) {
            return res.status(400).json({ error: 'Delivery does not exists' });
        }

        const currentDate = new Date();

        if (
            !isWithinInterval(currentDate, {
                start: startOfHour(setHours(currentDate, 8)),
                end: startOfHour(setHours(currentDate, 18)),
            })
        )
            return res.status(401).json({
                error: 'Deliveries can be only made it between 8:00h - 18:00h',
            });

        await delivery.update({
            signature_id: newFile.id,
            end_date: currentDate,
        });

        return res.json(delivery);
    }
}

export default new DeliveryDeliveredController();
