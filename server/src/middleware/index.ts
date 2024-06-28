// defaul jwt controller can be Copy and paste

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../model/user';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = "mysecretkey"

interface CustomRequest extends Request {
    user?: {
        permissions: string[];
    };
}

export const Permissions = {
    ADD_RESTAURANT: 'ADD_RESTAURANT',
    VIEW_RESTAURANTS: 'VIEW_RESTAURANTS',
    VIEW_RESTAURANT: 'VIEW_RESTAURANT',
    UPDATE_RESTAURANT: 'UPDATE_RESTAURANT',
    DELETE_RESTAURANT: 'DELETE_RESTAURANT',
    // Add more permissions as needed
} as const;

interface CustomRequest extends Request {
    user?: {
        permissions: string[];
    };
}

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};


export const comparePassword = async (candidatePassword: string, userPassword: string): Promise<boolean> => {
    return bcrypt.compare(candidatePassword, userPassword);
};


export const generateToken = (userId: string, permissions: string): string => {
    const secret = JWT_SECRET;
    if (!secret) {
        throw new Error('Missing JWT_SECRET in .env file');
    }
    console.log('id--->', userId);
    // permissions: permissions  console.log('permissions--->', permissions);
    return jwt.sign({ id: userId, permissions: permissions }, secret, { expiresIn: '1h' });
};

// //are allowed to access a specific route.
export const auth = (roles: any = []) => {
    return async (req: any, res: any, next: any) => {
        let token; //   let token: string | undefined;
        //     console.log('headers--->', req.headers);

        //This checks if the request headers have an authorization field that starts with the word 'Bearer'.
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            // console.log("re-", req.headers.authorization)
            //If it does, the token is extracted by splitting the header string and taking the second part, which is the actual token.
            token = req.headers.authorization.split(' ')[1];
        }
        //  console.log('token--->', token);

        if (!token) {
            return res.status(401).json({ message: 'Not authorized' })
        }
        try {
            //This line uses jwt.verify to decode the token with a secret key (JWT_SECRET). This verifies if the token is valid.
            const decoded: any = jwt.verify(token, JWT_SECRET);
            //console.log('Decoded token--->', decoded);

            //It then looks up the user in the database by the ID found in the token.
            let userDta = await User.findById(decoded.id)
            // console.log('User data--->', userDta);


            if (!userDta) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            if (roles.length && !roles.includes(userDta.role)) {
                return res.status(403).json({ message: 'Forbidden' })
            }


            req.user = userDta; // Attach user to request
            console.log('User role authorized--->', userDta.role);
            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server errorrr' });
        }
    }
}


// middleware/permissionCheck.js
type Role = 'adminAdmin' | 'admin' | 'user';

const rolePermissions: Record<Role, string[]> = {
    adminAdmin: ['ADD_RESTAURANT', 'VIEW_RESTAURANTS', 'VIEW_RESTAURANT', 'UPDATE_RESTAURANT', 'DELETE_RESTAURANT'],
    admin: ['VIEW_RESTAURANTS', 'VIEW_RESTAURANT', 'UPDATE_RESTAURANT'],
    user: ['VIEW_RESTAURANTS', 'VIEW_RESTAURANT']
};

const permissionCheck = (requiredPermissions: string[]) => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        if (!req.user || !req.user.permissions) {
            return res.status(403).json({ message: "Forbiddenn" });
        }

        const userPermissions = req.user.permissions;

        const hasPermission = requiredPermissions.every(permission =>
            userPermissions.includes(permission)
        );

        console.log("user --->", User);

        console.log("userPermissions --->", userPermissions);
        console.log("hasPermission --->", hasPermission);

        if (!hasPermission) {
            return res.status(403).json({ message: "Forbiddennn" });
        }

        next();
    };
};

export default permissionCheck;


// const permissionCheck = (requiredPermissions: (keyof typeof Permissions)[]) => {
//     return (req: CustomRequest, res: Response, next: NextFunction) => {
//         if (!req.user || !req.user.permissions) {
//             return res.status(403).json({ message: "Forbiddenn" });
//         }

//         const userPermissions = req.user.permissions;

//         const hasPermission = requiredPermissions.every(permission =>
//             userPermissions.includes(permission)
//         );
//         console.log("userPermissions --->", userPermissions);
//         console.log(">", hasPermission);

//         if (!hasPermission) {

//             return res.status(403).json({ message: "Forbiddennn" });
//         }

//         next();
//     };
// };

// export default permissionCheck;

/**



  Salting: Bcrypt also incorporates a salt, a random value added to the password before hashing. This ensures that even if two users have the same password, their hashed values will be different.
One-Way Function: The hashing process is a one-way function, meaning it cannot be reversed.

make a function tpe not a controller type
*/



// export const auth = (roles: any = []) => {
//     return async (req: any, res: any, next: any) => {
//         let token;

//         // Check if the authorization header is present and starts with 'Bearer'
//         if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//             token = req.headers.authorization.split(' ')[1];
//         }

//         if (!token) {
//             return res.status(401).json({ message: 'Not authorized' });
//         }

//         try {
//             const decoded: any = jwt.verify(token, JWT_SECRET);
//             const user = await User.findById(decoded.id);

//             if (!user) {
//                 return res.status(401).json({ message: 'Not authorized' });
//             }

//             if (roles.length && !roles.includes(user.role)) {
//                 return res.status(403).json({ message: 'Forbidden' });
//             }

//             req.user = user; // Attach the user to the request object
//             next();
//         } catch (error) {
//             console.error(error);
//             res.status(401).json({ message: 'Not authorized' });
//         }
//     }
// }