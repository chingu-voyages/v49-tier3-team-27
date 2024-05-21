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
    const isNewUser = await registerNewUser(formData);

    if (!isNewUser) {
      return "Failed to signUp user: No Error";
    }
    return "New user created successfully.";
  } catch (error) {
    return "Failed to SignUp user";
  }
}

async function registerNewUser(formData: FormData): Promise<NextResponse> {
  try {
    console.log("new user data: ", formData);

    const email = formData.get("email");
    const name = formData.get("name");
    const password = formData.get("password");

    if (!email || !name || !password || typeof email !== "string" || typeof name !== "string" || typeof password !== "string" || email.trim() === "" || name.trim() === "" || password.trim() === "") {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    await dbConnect();

    const emailTaken = await User.findOne({ email });

    if (emailTaken) {
      return NextResponse.json({ error: "Email is already registered." }, { status: 400 });
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
      message: "User created successfully",
      success: true,
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

