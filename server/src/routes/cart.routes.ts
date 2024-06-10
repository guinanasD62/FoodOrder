import express from "express";
import { addCart, deleteCart, getAllCarts, getCart, updateCart } from "../controller/cart.controller";

const router = express.Router();


router.post('/addcart', addCart);

router.get('/getcarts', getAllCarts);
router.get('/getcart/:id', getCart);

router.put('/updatecart/:id', updateCart);
router.delete('/deletecart/:id', deleteCart);

export default router;
