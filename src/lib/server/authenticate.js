import jwt from 'jsonwebtoken';
import { JWT_KEY } from "$env/static/private";

export const authenticate = (cookies) => {
    try {
        let token = cookies?.get('auth');
        const auth = jwt.verify(token, JWT_KEY);
        return auth;
    } catch {
        return undefined;
    }
}