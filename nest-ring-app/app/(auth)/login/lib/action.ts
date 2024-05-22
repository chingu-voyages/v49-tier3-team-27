"use server";

import { signIn, signOut } from "@/auth";
import User from "@/lib/models/User";
import dbConnect from "@/lib/mongo";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function login(prevState: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError && error.type == "CredentialsSignin") {
      return "Invalid credentials.";
    } else if (error instanceof AuthError) {
      return "Something went wrong.";
    }
    throw error;
  }
}

export async function signUpUser(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const response = await registerNewUser(formData);

    if (response.status !== 200) {
      const errorData = await response.json();
      return errorData.error || "Failed to sign up user.";
    }
    return "New user created successfully.";
  } catch (error) {
    return "Server error.";
  }
}

async function registerNewUser(formData: FormData): Promise<NextResponse> {
  try {
    console.log("new user data: ", formData);

    const email = formData.get("email");
    const name = formData.get("name");
    const password = formData.get("password");

    if (!email || !name || !password || typeof email !== "string" || typeof name !== "string" || typeof password !== "string" || email.trim() === "" || name.trim() === "" || password.trim() === "") {
      return NextResponse.json({ success: false, error: "Please fill the required fields" }, { status: 400 });
    }

    await dbConnect();

    const emailTaken = await User.findOne({ email });

    if (emailTaken) {
      return NextResponse.json({ success: false, error: "Email is already registered." }, { status: 400 });
    }

    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, salt);

    const newUser = {
      name,
      email,
      password: hashedPassword,
    };

    await User.create(newUser);

    return NextResponse.json({      
      success: true,
      message: "User created successfully",
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 },
    );
  }
}

