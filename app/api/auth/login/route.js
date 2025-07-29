import { emailVerificationLink } from "@/email/emailVerificationLink";
import { otpEmail } from "@/email/otpEmail";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, generateOTP, response } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/Otp.model";
import UserModel from "@/models/User.model";
import { SignJWT } from "jose";
import { z } from "zod";

export async function POST(request) {
    try {
      await connectDB();
      const payload = await request.json();

      const validationSchema = zSchema
        .pick({
          email: true,
        })
        .extend({
          password: z.string(),
        });

      const validatedData = validationSchema.safeParse(payload);
      if (!validatedData.success) {
        return response(
          false,
          401,
          "Invalid or missing input field.",
          validatedData.error
        );
      }

      const { email, password } = validatedData.data;

      // To Get User Data
      const getUser = await UserModel.findOne({ email });
      if (!getUser) {
        return response(false, 400, "Invalid Login Credentials.");
      }

      // Resent Email Verification Link
      if (!getUser.isEmailVerified) {
        const secret = new TextEncoder().encode(process.env.SECRET_KEY);
        const token = await new SignJWT({
          userId: getUser._id.toString(),
        })
          .setIssuedAt()
          .setExpirationTime("1h")
          .setProtectedHeader({ alg: "HS256" })
          .sign(secret);

        // Send Verification Email
        await sendMail(
          "Email Verification request from Personal Signature",
          email,
          emailVerificationLink(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`
          )
        );

        return response(
          false,
          401,
          "Your Email is not verified. We have sent a verification link to your registered email address."
        );
      }

      // Password Verification
      const isPasswordVerified = await getUser.comparePassword(password);
      if (!isPasswordVerified) {
        return response(false, 400, "Invalid Login Credentials.");
      }

      // OTP Generation
      // deleting old otps
      await OTPModel.deleteMany({ email });
      const otp = generateOTP()

      // Storing OTP into Database
      const newOtpData = new OTPModel({
        email, otp
      })

      await newOtpData.save()

      const otpEmailStatus = await sendMail(
        'Your Login Verification Code',
        email,
        otpEmail(otp)
    )
    if (!otpEmailStatus.success) {
        return response(
            false,
            400,
            "Failed to send OTP."
        )
    }
    return response(
        true, 
        200, 
        "Please Verify your Device."
    );

    } catch (error) {
        return catchError(error)
    }
}


