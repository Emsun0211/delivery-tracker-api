import { Schema, model } from "mongoose";
import { User } from "../utils/interfaces";


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    imgUrl: {
        type: String,
    }, 
    
    storeId: [{type: Schema.Types.ObjectId, ref: 'Store'}]
},
{
    timestamps: true,
})


export const userModel = model<User & Document>('User', userSchema)