import { Request, Response } from "express";
import { User } from "../model/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "mysecretkey";

type Role = 'adminAdmin' | 'admin' | 'user';

const rolePermissions: Record<Role, string[]> = {
    adminAdmin: ['ADD_RESTAURANT', 'VIEW_RESTAURANTS', 'VIEW_RESTAURANT', 'UPDATE_RESTAURANT', 'DELETE_RESTAURANT'],
    admin: ['ADD_RESTAURANT', 'VIEW_RESTAURANTS', 'VIEW_RESTAURANT', 'UPDATE_RESTAURANT'],
    user: ['VIEW_RESTAURANTS', 'VIEW_RESTAURANT']
};

export const addUser = async (req: Request, res: Response) => {
    try {
        const { name, email, img, phone, address, password, role } = req.body;

        // Ensure role is of type Role
        const typedRole: Role = role as Role;

        const permissions = rolePermissions[typedRole] || [];

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            img,
            phone,
            address,
            password: hashedPassword,
            role: typedRole,
            permissions, // Include permissions here
        });

        await user.save();
        return res.status(201).json({ message: "New user created!", data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user" });
    }
};


// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        return res.status(200).json({ data: users });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error fetching users" });
    }
};

// Get one user
export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        return res.status(200).json({ data: user });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error fetching user" });
    }
};

// Get one user
export const findById = async (id: any) => {
    try {
        const user = await User.findById(id);
        return user
    } catch (error) {
        console.log(error);
    }
};

// export const updateUser = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const { password, ...otherUpdates } = req.body;

//         let updatedFields = otherUpdates;

//         if (password) {
//             const hashedPassword = await bcrypt.hash(password, 10);
//             updatedFields = { ...updatedFields, password: hashedPassword };
//         }

//         const user = await User.findByIdAndUpdate(id, updatedFields, { new: true });

//         if (!user) {
//             return res.status(404).json({ message: "No user found." });
//         }

//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: "Error updating user" });
//     }
// };

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { password, ...otherUpdates } = req.body; // Exclude password from other updates

        let updatedFields = { ...otherUpdates }; // Start with other updates

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedFields = { ...updatedFields, password: hashedPassword }; // Only update password if provided
        }

        const user = await User.findByIdAndUpdate(id, updatedFields, { new: true });

        if (!user) {
            return res.status(404).json({ message: "No user found." });
        }

        res.status(200).json({ data: user });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Error updating user" });
    }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete({ _id: id });

        if (!user) {
            return res.status(404).json({ message: "No user found." });
        }

        return res.status(200).json({ message: "User deleted!", data: user });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error deleting user" });
    }
};


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            {
                id: user._id,
                permissions: user.permissions, // Include permissions in the token payload
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getCurrentUser = async (req: Request, res: Response) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    const token = authorizationHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        const decoded: any = jwt.verify(token, JWT_SECRET);
        let userData = await User.findById(decoded.id);
        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// // Verify Email
// export const verifyEmail = async (req: Request, res: Response) => {
//     const { email } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (user) {
//             return res.status(200).json({ verified: true });
//         } else {
//             return res.status(400).json({ verified: false });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// // Reset Password
// export const resetPassword = async (req: Request, res: Response) => {
//     const { email, newPassword } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'User not found' });
//         }
//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         user.password = hashedPassword;
//         await user.save();
//         return res.status(200).json({ message: 'Password reset successful' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };