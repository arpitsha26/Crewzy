import sendMail from "../config/Mail.js"
import genToken from "../config/token.js"
import User from "../models/user.model.js"
import dotenv from "dotenv";

dotenv.config();

import bcrypt from "bcryptjs"


export const signUp = async (req, res) => {
    try {
        const { name, email, password, userName } = req.body

        const findByEmail = await User.findOne({ email })
        if (findByEmail) {
            return res.status(400).json({
                message: "User with this email already exist"
            })
        }

        const findByUserName = await User.findOne({ userName })
        if (findByUserName) {
            return res.status(400).json({
                message: "Username already taken"
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "password must be atleast 6 charcters"
            })

        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name, userName, email,
            password: hashedPassword
        })

        const token = await genToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?"none":"strict",
            partioned: true

            
        })

        return res.status(201).json(user)


    } catch (error) {
        return res.status(500).json({
            message: `sign up error ${error}`
        })


    }

}






export const signIn = async (req, res) => {
    try {
        const { password, userName } = req.body

        const user = await User.findOne({ userName })
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }


        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: "Incorrect password"
            })

        }



        const token = await genToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?"none":"strict",
            partioned: true

        })

        return res.status(200).json(user)


    } catch (error) {
        return res.status(500).json({
            message: `sign in error ${error}`
        })


    }

}


export const signOut = async (req, res) => {
    try {
        res.clearCookie("token")

        return res.status(200).json({
            message: "sign out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: `signout error ${error}`
        });

    }
}

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString()
        user.resetOtp = otp
        user.otpExpires = Date.now() + 5 * 60 * 1000
        user.isOtpverified = false

        await user.save()

        await sendMail(email, otp)

        return res.status(200).json({
            message: "Email successfully send"
        })
    } catch (error) {
        return res.status(500).json({
            message: `send otp error ${error}`
        });

    }
}

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body
        const user = await User.findOne({ email })
        if (!user || user.resetOtp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or Expired Otp" })

        }

        user.isOtpverified = true
        user.resetOtp = undefined
        user.otpExpires = undefined
        await user.save()

        return res.status(200).json({
            message: "Otp verified successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: `otp verify error ${error}`
        });

    }
}

export const resetPassword = async (req, res) => {
    try {


        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            console.log(`No user found for email: ${email}`);
            return res.status(400).json({ message: "User not found" });
        }

        if (!user.isOtpverified) {
            return res.status(400).json({ message: "OTP verification required" });
        }

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            console.error("Password hashing error:", err);
            return res.status(500).json({ message: "Error hashing password" });
        }

        user.password = hashedPassword;
        user.isOtpverified = false;

        try {
            await user.save();
        } catch (err) {
            console.error("Error saving user:", err);
            return res.status(500).json({ message: "Error saving user" });
        }

        return res.status(200).json({ message: "Password reset successfully" });

    } catch (error) {
        console.error("🔥 resetPassword error:", error);
        return res.status(500).json({
            message: "Internal server error during password reset",
        });
    }
};
