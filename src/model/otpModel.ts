import mongoose, {Schema, model} from 'mongoose'
import {Otp, OtpType} from '../utils/interfaces'


const OtpSchema: Schema = new Schema({
    
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        type: {
          type: String,
          enum: Object.values(OtpType),
        },
        otp: {
          type: String,
          required: true,
        },
        otpExpiration: {
          type: Date,
          default: null,
        }
    },
    { timestamps: true }

)


export const OtpModel = model('OtpModel', OtpSchema) 