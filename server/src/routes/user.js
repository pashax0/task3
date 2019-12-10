import { Router } from 'express';
import * as userController from '../controllers/user';

const router = Router();

router.post('/', userController.addUser);
router.get('/', userController.getUserList);
router.get('/:id', userController.getUserWithAdvertsById);
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);

export default router;
