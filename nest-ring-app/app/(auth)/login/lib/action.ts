"use server";

import { signIn, signOut } from "@/auth";
import User from "@/lib/models/User";
import dbConnect from "@/lib/mongo";
import { AuthError } from "next-auth";

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

async function registerNewUser(formData: FormData) {
  try {
    console.log("new user data: ", formData);
    const email = formData.get("email");
    const name = formData.get("name");
    const password = formData.get("password");

    const newUser = {
      name,
      email,
      password,
    };

    await dbConnect();
    const savedUser = await User.create(newUser);

    console.log("saved user: ", savedUser);
    if (savedUser) {
      return true;
    }

    return false;
  } catch (error) {
    throw error;
  }
}
