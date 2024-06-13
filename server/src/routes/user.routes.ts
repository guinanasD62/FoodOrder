import express from "express";
import { addUser, getAllUsers, getUser, updateUser, deleteUser, login, getCurrentUser } from "../controller/user.controller";
import { auth } from "../middleware";
//, verifyEmail, resetPassword 
const router = express.Router();

router.post('/adduser', addUser);
router.post('/login', login)
router.get('/current_user', getCurrentUser);
// router.get('/current-user', auth(), (req, res) => {
//     res.status(200).json({ user: req.userDta });
// });
// router.post('/verify-email', verifyEmail);
// router.post('/reset-password', resetPassword);

router.get('/getusers', getAllUsers);
router.get('/getuser/:id', getUser);

router.put('/updateuser/:id', updateUser)

router.delete('/deleteuser/:id', deleteUser)

export default router;
