import { Router } from 'express';
import * as advertController from '../controllers/advert';

const router = Router();

router.post('/', advertController.addAdvert);
router.get('/', advertController.getAdvertList);
router.get('/:id', advertController.getAdvertByIdWithContacts);
router.put('/', advertController.updateAdvertById);
router.delete('/', advertController.deleteAdvertById);

export default router;
