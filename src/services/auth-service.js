import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'BASICSECRET';

export default {
    async register(userData) {
        // Check if password match repassword
        if(userData.password !== userData.rePassword){
            throw new Error('Password missmatch');
        }

        // Validate if email exists
        const userCount = await User.countDocuments({ email: userData.email });
        if(userCount > 0){
            throw new Error('Email already exists');
        }

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