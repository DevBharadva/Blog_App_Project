const otpGenerator = require('otp-generator')
const nodemailer = require('nodemailer')
require('dotenv').config()
const bcrypt = require('bcrypt');
const UserOTP = require('../model/otp.model');
const User = require('../model/user.model')

/***********************Forgot Password Page***********************/
exports.forgotpasswordPage =async (req, res)=>{
    try {
        res.render("forgotPassword.ejs");
    } catch (error) {
        console.log(error);
        res.json({messag: "Server error"});
    }
}

/***********************OTP Vrify Page***********************/
exports.showverifyotppage = async (req, res)=>{
    try {
        res.render("otp.ejs");
    } catch (error) {
        console.log(error);
        res.json({messag: "Server error"});
    }
}

/***********************reset password Page***********************/
exports.resetPasswordPage = async (req, res)=>{
    try {
        res.render("resetpassword.ejs");
    } catch (error) {
        console.log(error);
        res.json({messag: "Server error"});
    }
}

/***********************GenrateOTP***********************/
exports.generateotp = async (req, res) => {
    try {
        const otpmail = req.body.email;
        console.log('OTP mail:', otpmail);

        let user = await User.findOne({ email: otpmail });
        if (user) {
            const otp = otpGenerator.generate(4, {
                digits: true,
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            console.log('Generated OTP:', otp);

            await UserOTP.create({ email: otpmail, otp: otp });
            console.log('Generated OTP:', otp);

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASS
                }
            });
            console.log('Generated OTP:', otp);

            await transporter.sendMail({
                from: process.env.EMAIL,
                to: otpmail,
                subject: 'OTP Verification',
                text: `Your OTP for verification is: ${otp}`
            });

            res.status(200).redirect(`/api/user/verifyOTP?email=${otpmail}`);
        } else {
            res.status(400).render("verifyemail.ejs", { message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending OTP');
    }
};

/***********************VerifyOTP***********************/
exports.verifyotp = async (req, res) => {
    try {
        const { otp } = req.body;        
        const otpRecord = await UserOTP.findOne({ otp: otp }).exec();
        if (otpRecord) {
            res.status(200).redirect("/api/user/resetpasswordpage"); 
        } else {
            res.status(400).render('otp.ejs', { message: "Invalid OTP", email: email }); 
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error verifying OTP');
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { newpassword, confirmpassword } = req.body;
        let user = req.user;
        if (!newpassword || !confirmpassword) { 
            return res.json({ message: "please fufilled the password"});
        }
        if (newpassword !== confirmpassword) { 
           return res.json({ message: 'confirm password not matched...' });
        }

        let hashpasssword = await bcrypt.hash(newpassword, 10);
        user = await User.findByIdAndUpdate(
            user._id, 
            { $set: { password: hashpasssword } },
            { new: true }
        );
        res.status(200).redirect('/api/blog');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error...' });
    }
};
























