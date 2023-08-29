import { userModel } from "../model/userModel";
import { OtpType, User } from "../utils/interfaces";
import { UserSignup, completeSignup } from "../dtos/user.dto";
import { Service } from 'typedi';
import { hash, compare } from "bcrypt";
import jwt from 'jsonwebtoken'
import { AppError } from "../utils/AppError";
import { genrateOtp, verifyOtp } from "../utils/otp";
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


    private async completeSignup(data: completeSignup){
        const {email, otp} = data;

        const user = await userModel.findOne({email: email});

        if(!user){
            throw new AppError(404, 'User not found')
        }

        if(user.isEmailVerified){
            throw new AppError(400, 'User already verified')
        }

        if(user.isSignupCompleted){
            throw new AppError(400, 'User is already signed up')
        }

        const userOtp = await OtpModel.findOne({user: user._id, type: OtpType.VERIFICATION})
        
        if(!userOtp){
            throw new AppError(400, 'No user found with this otp')
        }

        if(userOtp.otpExpiration < Date.now()){
            throw new AppError(400, 'Otp has expired')
        }

        const isValidOtp = await verifyOtp(user._id,  OtpType.VERIFICATION, otp)

        if(!isValidOtp){
            throw new AppError(400, 'Invalid OTP')
        }

        const updateUser = await userModel.findByIdAndUpdate(
            user._id, 
            {name: user.name, email: user.email, isSingupCompleted: true, isEmailVerified: true  }
        )

        await OtpModel.deleteOne()

        return updateUser

    }


}