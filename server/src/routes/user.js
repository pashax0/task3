import { Router } from 'express';
const userController = require('../controllers/user');

const router = Router();

router.get('/', userController.getUserList);
router.post('/', userController.addUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);

// router.get('/', (req, res) => {
//   return res.send(Object.values(req.context.models.users));
// });
// router.get('/:userId', (req, res) => {
//   return res.send(req.context.models.users[req.params.userId]);
// });

export default router;
