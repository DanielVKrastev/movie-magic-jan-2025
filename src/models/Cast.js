import { Schema, model } from "mongoose";

const castSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: [5, 'Name should be at least 5 characters long!'],
        maxLength: 250,
        match: [/[A-Za-z 0-9]+$/, 'Name should be alphanumeric, digits and whitespaces only!'],
    },
    age: {
        type: Number,
        min: 0,
        max: 120,
    },
    born: {
        type: String,
        minLength: 10,
        match: [/[A-Za-z 0-9]+$/, 'Born should be alphanumeric, digits and whitespaces only!'],
    },
    imageUrl: {
        type: String,
        match:[/https?:\/\//, 'ImageUrl is invalid!'],
    },
});

const Cast = model('Cast', castSchema);

export default Cast;