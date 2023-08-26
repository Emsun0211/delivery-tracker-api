import { IsEmail, IsString, Length, IsOptional, Matches } from "class-validator";


export class UserSignup{
   @IsString()
   name!:string;
   
   
    @IsEmail()
    @IsString()
    email!: string;

    @IsString()
    @Length(6, 20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters' })
    password!: string;


}