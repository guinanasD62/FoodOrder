import express from "express";
import { addOrder, deleteOrder, getAllOrders, getOrder, updateOrder } from "../controller/order.controller";
const router = express.Router();


router.post('/addorder', addOrder);

router.get('/getorders', getAllOrders);
router.get('/getorder/:id', getOrder);

router.put('/updateorder/:id', updateOrder);
router.delete('/deleteorder/:id', deleteOrder);

export default router;
