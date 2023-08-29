import { OtpModel } from "../model/otpModel";

export const genrateOtp = (len: number) =>{
    const numberList = '1234567890'
    let OTP = '';
    for(let i=0; i<len; i++){
        OTP += numberList[Math.floor(Math.random() * numberList.length)]
    }

    return OTP;
}


export const verifyOtp = async (user: any, type: string, otp: number): Promise<any>=> {
    const existingOtp = await OtpModel.findOne({
        type: type,
        otp: otp,
        user
    })

    let currentDate = new Date()
    if(!existingOtp || existingOtp.otpExpiration < currentDate ) {
        return null;
    }

    return existingOtp._id
}