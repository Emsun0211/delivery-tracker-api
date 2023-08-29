import { userModel } from "../model/userModel";
import { OtpType, User } from "../utils/interfaces";
import { UserSignup } from "../dtos/user.dto";
import { Service } from 'typedi';
import { hash, compare } from "bcrypt";
import jwt from 'jsonwebtoken'
import { AppError } from "../utils/AppError";
import { genrateOtp } from "../utils/otp";
import { OtpModel } from "../model/otpModel";




@Service()
export class AuthService {
    public async getUserByEmail(email: string): Promise<User | null> {
        const user = await userModel.findOne({ email });

        return user
    }

    private createToken(data: UserSignup) {
        let token;
        try {
            //Creating jwt token
            token = jwt.sign(
                data,
                "secretkeyappearshere",
                { expiresIn: "1h" }
            );
        } catch (err) {
            console.log(err);
        }

        return token
    }


    public async singup(data: UserSignup) {
        
        

        const existingUser = await this.getUserByEmail(data.email)

        if (existingUser) {
             throw new AppError(400, 'User already register')
        }


        const hashPassword = await hash(data.password, 10)

        const token = this.createToken(data)
        console.log(token)
        
        const createdUser = await userModel.create({
            name: data.name,
            email: data.email,
            password: hashPassword
        })

        const otp = genrateOtp(6)
        let otpExpiration: any = new Date()
        otpExpiration = otpExpiration.setMinutes(otpExpiration.getMinutes() + 10) 
        const createdOTP = new OtpModel({
            user: createdUser._id,
            otp,
            otpExpiration,
            type: OtpType.VERIFICATION
        })

        await createdOTP.save()
        

        console.log(createdUser)
        return {createdUser, token}


    }




}