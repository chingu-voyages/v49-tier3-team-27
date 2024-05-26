import mongoose from "mongoose";
import dbConnect from "@/lib/mongo";
import User from "@/lib/models/User";
import { NextRequest, NextResponse } from "next/server";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { CloudinaryResponse } from "@/lib/types";
import bcrypt from "bcrypt"

export async function PUT(req: NextRequest) {

  try{

      const payload = await req.formData();

      const email = payload.get("email")
      const avatarFile = payload.get("avatarFile") as File
      const bannerFile = payload.get("bannerFile") as File
      const firstname = payload.get("firstname") as string
      const middlename = payload.get("middlename") as string
      const lastname = payload.get("lastname") as string
      const description = payload.get("description") as string
      const dob = payload.get("dob") as string
      const accountType = payload.get("accountType") as string
      const authToken = payload.get("authToken") as string
      const deliveryAddress = payload.get("deliveryAddress") as string
      const country = payload.get("country") as string
      const state = payload.get("state") as string
      const city = payload.get("city") as string
      const password = payload.get("password") as string 
      
      const location = {
        country,
        state,
        city,
        deliveryAddress,
      }

      await dbConnect();

      let avatarUrl
      let bannerUrl

      if (avatarFile) {
        const arrayBuffer = await avatarFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const results = await uploadImageToCloudinary(buffer, avatarFile.name);
        avatarUrl = (results as CloudinaryResponse).secure_url;
      }
      if (bannerFile) {
        const arrayBuffer = await bannerFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const results = await uploadImageToCloudinary(buffer, bannerFile.name);
        bannerUrl = (results as CloudinaryResponse).secure_url;
      }

      const userExists = await User.findOne({ email })

      if(!userExists) {
        return NextResponse.json({ message: "No user found." }, { status: 404 })
      }

      const match = await bcrypt.compare(userExists.password, password);
      if (!match) {
        return NextResponse.json({ message: "Password is not correct." }, { status: 401 })
      }
    
      const updatedUser = await User.findOneAndUpdate({ _id: userExists._id }, 
        {
          ...userExists,
          avatarUrl,
          bannerUrl,
          firstname,
          middlename,
          lastname,
          description,
          dob,
          accountType,
          authToken,
          location,
          isAuthenticated: true,
          isEmailVerified: true,
          isProfileComplete: true,
        }      
      );

      return NextResponse.json({ message: "Profile update successful." }, { status: 201 });

    } catch(err) {

      console.log("Error: ", err)
      return NextResponse.json({ message: "Something went wrong." }, { status: 500 })

    }    
    
  }