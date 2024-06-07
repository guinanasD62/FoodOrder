// defaul jwt controller can be Copy and paste

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../model/user';

const JWT_SECRET = "mysecretkey"


export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};


export const comparePassword = async (candidatePassword: string, userPassword: string): Promise<boolean> => {
    return bcrypt.compare(candidatePassword, userPassword);
};


export const generateToken = (userId: string): string => {
    const secret = JWT_SECRET;
    if (!secret) {
        throw new Error('Missing JWT_SECRET in .env file');
    }
    return jwt.sign({ id: userId }, secret, { expiresIn: '1h' });
};

//are allowed to access a specific route.
export const auth = (roles: any = []) => {
    return async (req: any, res: any, next: any) => {
        let token;

        //This checks if the request headers have an authorization field that starts with the word 'Bearer'.
        if (req.headers.authrization && req.headers.authorization.startsWith('Bearer')) {
            //If it does, the token is extracted by splitting the header string and taking the second part, which is the actual token.
            token = req.headers.authorization.split('')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Not authorized' })
        }
        try {
            //This line uses jwt.verify to decode the token with a secret key (JWT_SECRET). This verifies if the token is valid.
            const decoded: any = jwt.verify(token, JWT_SECRET);
            //It then looks up the user in the database by the ID found in the token.
            let userDta = await User.findById(decoded.id)
            if (roles.length && !roles.includes(userDta.role)) {
                return res.status(403).json({ message: 'Forbidden' })
            }
            next();
        } catch (error) {

        }
    }
}
/**
  
  Salting: Bcrypt also incorporates a salt, a random value added to the password before hashing. This ensures that even if two users have the same password, their hashed values will be different.
One-Way Function: The hashing process is a one-way function, meaning it cannot be reversed. 

make a function tpe not a controller type
*/