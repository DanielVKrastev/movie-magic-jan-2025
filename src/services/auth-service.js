import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const SECRET = '$2da22vggFSK5R2n2EYmPQGub.Vh.bTbb1zAFxtYTvBXqymyYIt7S3UpSt2O'

export default {
    register(userData) {
        return User.create(userData);
    },
    async login(email, password){
        // Check user exists
        const user = await User.findOne({email});
        if(! user ){
            throw new Error('Invalid email or password');
        }

        // Check password is correct
        const isValid = await bcrypt.compare(password, user.password);
        if (! isValid){
            throw new Error('Invalid email or password');
        }

        // Generate token
        const payload = {
            id: user._id,
            email: user.email,
        };

        //TODO: Use async option
        const token = jwt.sign(payload, SECRET, { expiresIn: '2h'});
        // Return token

        return token;
    },
}