import express from "express";
import { addUser, getAllUsers, getUser, updateUser, deleteUser, login } from "../controller/user.controller";
//, verifyEmail, resetPassword 
const router = express.Router();

router.post('/adduser', addUser);
router.post('/login', login)
// router.post('/verify-email', verifyEmail);
// router.post('/reset-password', resetPassword);

router.get('/getusers', getAllUsers);
router.get('/getuser/:id', getUser);

router.put('/updateuser/:id', updateUser)

router.delete('/deleteuser/:id', deleteUser)

export default router;
