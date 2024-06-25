import express from "express";
import { addMenu, deleteMenu, getAllMenu, getMenu, updateMenu } from "../controller/menuItem.controller";
import { auth } from "../middleware";
import { upload } from "../middleware/multer";

const router = express.Router();

router.post('/addmenu', upload.single('img'), addMenu);
//router.post('/addmenu', auth(['admin']), addMenu);

router.get('/getmenus', getAllMenu);
router.get('/getmenu/:id', getMenu);

router.put('/updatemenu/:id', upload.single('img'), updateMenu)

router.delete('/deletemenu/:id', deleteMenu)

export default router;
