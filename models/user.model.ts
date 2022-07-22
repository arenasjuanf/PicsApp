
import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is Required"]
    }, 
    avatar :{
        type: String,
        default: 'av-0.png'
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"]

    },
    password: {
        type: String,
        required: [true, "Password is required"]

    }
});

userSchema.method('comparePassword', function( password: string): boolean {
    return bcrypt.compareSync( password, this.password) ? true : false;
});



export interface IUser extends Document {
    nombre: string,
    email: string,
    password: string,
    comparePassword: (password: string) => boolean
}

export const User = model<IUser>('User', userSchema);