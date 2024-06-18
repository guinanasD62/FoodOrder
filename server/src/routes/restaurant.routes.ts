import express from "express";
import { addRestaurant, deleteRestaurant, getAllRestaurants, getRestaurant, updateRestaurant } from "../controller/restaurant.controller";
import { auth } from "../middleware";
const router = express.Router();


router.post('/addrestaurant', auth(['admin']), addRestaurant);
//router.post('/addrestaurant', addRestaurant);
// router.post('/addrestaurant', auth(['admin']), addRestaurant);

router.get('/getrestaurants', getAllRestaurants);
router.get('/getrestaurant/:id', getRestaurant);

router.put('/updaterestaurant/:id', updateRestaurant);

router.delete('/deleterestaurant/:id', deleteRestaurant);

export default router;
