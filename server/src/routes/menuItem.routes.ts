import express from "express";
import { addMenu, deleteMenu, getAllMenu, getMenu, updateMenu } from "../controller/menuItem.controller";
import { auth } from "../middleware";

const router = express.Router();

router.post('/addmenu', addMenu);
//router.post('/addmenu', auth(['admin']), addMenu);

router.get('/getmenus', getAllMenu);
router.get('/getmenu/:id', getMenu);

router.put('/updatemenu/:id', updateMenu)

router.delete('/deletemenu/:id', deleteMenu)

export default router;
