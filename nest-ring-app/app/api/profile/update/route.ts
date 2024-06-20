import mongoose from "mongoose";
import dbConnect from "@/lib/mongo";
import User from "@/lib/models/User";
import { NextRequest, NextResponse } from "next/server";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { CloudinaryResponse } from "@/lib/types";
import bcrypt from "bcrypt";
import { deleteCloudinaryImage } from "@/app/(root)/lib/utils";

export async function PUT(req: NextRequest) {
  try {
    const payload = await req.formData();

    console.log("profile upload payload: ", payload);
    const email = payload.get("email");
    const avatarFile = (payload.get("avatarFile") as File) || undefined;
    const bannerFile = (payload.get("bannerFile") as File) || undefined;
    const existing_avatarUrl =
      (payload.get("avatarUrl") as string) || undefined;
    const existing_bannerUrl =
      (payload.get("bannerUrl") as string) || undefined;
    const firstname = payload.get("firstname") as string;
    const middlename = payload.get("middlename") as string;
    const lastname = payload.get("lastname") as string;
    const description = payload.get("description") as string;
    const dob = payload.get("dob") as string;
    const accountType = payload.get("accountType") as string;
    const authToken = payload.get("authToken") as string;
    const deliveryAddress = payload.get("deliveryAddress") as string;
    const country = payload.get("country") as string;
    const state = payload.get("state") as string;
    const city = payload.get("city") as string;
    const password = payload.get("password") as string;

    const location = {
      country,
      state,
      city,
      deliveryAddress,
    };

    await dbConnect();

    const userExists = await User.findOne({ email });

    if (!userExists) {
      return NextResponse.json({ message: "No user found." }, { status: 404 });
    }

    const match = await bcrypt.compare(password, userExists.password);
    if (!match) {
      return NextResponse.json(
        { message: "Password is not correct." },
        { status: 401 }
      );
    }

    let avatarUrl = existing_avatarUrl;
    let bannerUrl = existing_bannerUrl;

    if (avatarFile) {
      if (existing_avatarUrl) {
        await deleteCloudinaryImage(existing_avatarUrl);
      }
      const arrayBuffer = await avatarFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const results = await uploadImageToCloudinary(buffer, avatarFile.name);
      avatarUrl = (results as CloudinaryResponse).secure_url;
    }
    if (bannerFile) {
      if (existing_bannerUrl) {
        await deleteCloudinaryImage(existing_bannerUrl);
      }
      const arrayBuffer = await bannerFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const results = await uploadImageToCloudinary(buffer, bannerFile.name);
      bannerUrl = (results as CloudinaryResponse).secure_url;
    }

    await User.findOneAndReplace(
      { _id: userExists._id },
      {
        name: `${firstname} ${middlename} ${lastname}`,
        email: userExists.email,
        password: userExists.password,
        foodOrders: userExists.foodOrders,
        createdAt: userExists.createdAt,
        updateAt: userExists.updateAt,
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

    return NextResponse.json(
      { message: "Profile update successful." },
      { status: 201 }
    );
  } catch (err) {
    console.log("Error: ", err);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
