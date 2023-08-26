import { userModel } from "../model/userModel";
import { User } from "../utils/interfaces";
import { UserSignup } from "../dtos/user.dto";
import { Service } from 'typedi';
import { hash, compare } from "bcrypt";
import jwt from 'jsonwebtoken'
import { AppError } from "../utils/AppError";




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
        console.log(data)
        const existingUser = await this.getUserByEmail(data.email)

        if (existingUser) {
             new AppError(400, 'User already register')
        }


        const hashPassword = await hash(data.password, 10)

        const token = this.createToken(data)
        
        const createdUser = await userModel.create({
            name: data.name,
            email: data.email,
            password: hashPassword
        })

        return createdUser


    }




}