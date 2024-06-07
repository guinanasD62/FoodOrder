import express from "express";
import { addmenu, deleteMenu, getAllMenu, getMenu, updateMenu } from "../controller/menu.controller";
import { auth } from "../middleware";

const router = express.Router();

router.post('/addmenu', auth(['restaurant']), addmenu);

router.get('/getmenus/', getAllMenu);
router.get('/getmenu/:id', getMenu);

router.put('/updatemenu/:id', updateMenu)

router.delete('/deletemenu/:id', deleteMenu)

export default router;
