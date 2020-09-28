import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryWithdrawnController from './app/controllers/DeliveryWithdrawnController';
import DeliveryDeliveredController from './app/controllers/DeliveryDeliveredController';
import DeliverymanDeliveryController from './app/controllers/DeliverymanDeliveryController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.put('/deliveries/:id/withdrawn', DeliveryWithdrawnController.update);
routes.put(
    '/deliveries/:id/delivered',
    upload.single('file'),
    DeliveryDeliveredController.update
);

routes.get('/deliveryman/:id/deliveries', DeliverymanDeliveryController.index);

routes.get('/deliveries/problems', DeliveryProblemController.index);
routes.get('/deliveries/:id/problems', DeliveryProblemController.show);
routes.post('/deliveries/:id/problems', DeliveryProblemController.store);
routes.delete('/deliveries/:id/problems', DeliveryProblemController.delete);

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.get('/deliverymen', DeliverymanController.index);
routes.post('/deliverymen', DeliverymanController.store);
routes.put('/deliverymen/:id', DeliverymanController.update);
routes.delete('/deliverymen/:id', DeliverymanController.delete);

routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
