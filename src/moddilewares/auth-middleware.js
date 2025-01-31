import jwt, { decode } from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'BASICSECRET';

export const authMiddleware = (req, res, next) => {
    // Get token
    const token = req.cookies['auth'];
    if(! token ){
        return next();
    }

    // Validate token
    try{
        const decodedToken = jwt.verify(token, SECRET);

        // Attach decoded token to request
        req.user = decodedToken;
        
        next();

    }catch(err){
        // Invalid token

        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
    
    // Guest users

}