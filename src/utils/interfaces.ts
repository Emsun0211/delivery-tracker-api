import mongoose, { Document } from "mongoose";
import { Router } from 'express';




interface Product {
    name: string;
    price: number;

    // other properties...
  }


interface Store {
    name: string;
    products: Product[];
    _id: number;
    // other properties...
  }


 

export interface User {
    _id?: string;
    name: string;
    email: string;
    imgUrl: string;
    password: string;
    createdAt: Date;
    isSignupCompleted?: boolean;
    isEmailVerified?: boolean;
    storeId: Store['_id'][]

}




export interface Otp {
  user: User;
  type: OtpType;
  otp:  string;
  otpExpiration: Date | null;
}

export enum OtpType {
  FORGET = 'forget',
  VERIFICATION = 'verification',
  CHANGE = 'change',
}





export interface Routes {
  path: string
  router: Router
}