import express from "express";
import { addfood, deleteMenu, getAllMenu, getMenu, updateMenu } from "../controller/menu.controller";

const router = express.Router();

router.post('/addmenu', addfood);

router.get('/getmenus/', getAllMenu);
router.get('/getmenu/:id', getMenu);

router.put('/updatemenu/:id', updateMenu)

router.delete('/deletemenu/:id', deleteMenu)

export default router;
