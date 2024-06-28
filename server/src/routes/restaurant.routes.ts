import express from "express";
import { addRestaurant, deleteRestaurant, getAllRestaurants, getRestaurant, updateRestaurant } from "../controller/restaurant.controller";
import permissionCheck, { auth } from "../middleware";
const router = express.Router();
// import { auth } from "../middleware";


// router.post('/addrestaurant', auth(['admin']), addRestaurant);
// //router.post('/addrestaurant', addRestaurant);
// // router.post('/addrestaurant', auth(['admin']), addRestaurant);

// router.get('/getrestaurants', getAllRestaurants);
// router.get('/getrestaurant/:id', getRestaurant);

// router.put('/updaterestaurant/:id', updateRestaurant);

// router.delete('/deleterestaurant/:id', deleteRestaurant);

router.post('/addrestaurant', auth(), permissionCheck(['ADD_RESTAURANT']), addRestaurant);
router.get('/getrestaurants', auth(), permissionCheck(['VIEW_RESTAURANTS']), getAllRestaurants);
router.get('/getrestaurant/:id', auth(), permissionCheck(['VIEW_RESTAURANT']), getRestaurant);
router.put('/updaterestaurant/:id', auth(), permissionCheck(['UPDATE_RESTAURANT']), updateRestaurant);
router.delete('/deleterestaurant/:id', auth(), permissionCheck(['DELETE_RESTAURANT']), deleteRestaurant);

export default router;