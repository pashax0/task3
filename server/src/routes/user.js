import { Router } from 'express';
import * as userController from '../controllers/user';

const router = Router();

router.post('/', userController.addUser);
router.get('/', userController.getUserList);
router.get('/:id', userController.getUserWithAdvertsById);
router.put('/', userController.updateUserById);
router.delete('/', userController.deleteUserById);

export default router;
