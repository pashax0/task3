import { Router } from 'express';
const advertController = require('../controllers/advert');

const router = Router();

router.get('/', advertController.getAdvertList);
router.post('/', advertController.addAdvert);
router.get('/:id', advertController.getAdvertById);
router.put('/:id', advertController.updateAdvertById);
router.delete('/:id', advertController.deleteAdvertById);

// router.post('/', (req, res) => {
//   const id = (Math.random() * 1000).toFixed(0);
//   const message = {
//     id,
//     text: req.body.text,
//     userId: req.context.me.id,
//   };
//   req.context.models.messages[id] = message;
//   return res.send(message);
// });
// router.delete('/:messageId', (req, res) => {
//   const {
//     [req.params.messageId]: message,
//     ...otherMessages
//   } = req.context.models.messages;
//   req.context.models.messages = otherMessages;
//   return res.send(message);
// });
export default router;
