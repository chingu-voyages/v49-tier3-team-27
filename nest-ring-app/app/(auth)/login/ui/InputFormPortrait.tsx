import facebook_icon from "@/public/auth-form-icons/facebook-f.svg";
import google_icon from "@/public/auth-form-icons/google-plus-g.svg";
import Image from "next/image";
import { useFormState } from "react-dom";
import { login, signUpUser } from "../lib/action";

const InputFormPortrait = ({ action }: { action: string }) => {
  const [loginErrorMessage, dispatchLogin] = useFormState(login, undefined);
  const [signUpErrorMessage, dispatchSignUp] = useFormState(
    signUpUser,
    undefined
  );

  return (
    <>
      {action === "signIn" && (
        <div className="w-full  flex flex-col items-center justify-center signin-form-portrait">
          <span className="font-bold text-[35px]">Sign In</span>
          <div className="flex flex-row gap-2">
            <a href="">
              <Image
                src={google_icon}
                alt="Click here to Sign in with your google account"
                width={40}
                height={40}
                className="p-2 w-[40px] h-[40px] border rounded-lg"
              />
            </a>
            <a href="">
              <Image
                src={facebook_icon}
                alt="Click here to Sign in with your facebook account"
                width={40}
                height={40}
                className="p-2 w-[40px] h-[40px] border rounded-lg"
              />
            </a>
          </div>
          <span className="">or use your email and password</span>
          <form
            action={dispatchLogin}
            className="flex flex-col gap-2 w-3/4 items-center"
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="bg-gray-200 text-gray-400 p-2 rounded-lg w-full"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              minLength={6}
              className=" bg-gray-200 text-gray-400 p-2 rounded-lg w-full"
            />
            <span className="">Error: {loginErrorMessage}</span>
            <button
              type="submit"
              className=" font-semibold w-[40%] p-2 rounded-md bg-interactive-green text-white"
            >
              SIGN IN
            </button>
          </form>
        </div>
      )}

      {action === "signUp" && (
        <div className="w-full flex flex-col items-center justify-center signup-form-portrait">
          <span className="font-bold text-[35px] justify-start">
            Create Account
          </span>
          <div className="flex flex-row gap-2">
            <a href="">
              <Image
                src={google_icon}
                alt="Click here to Sign in with your google account"
                width={40}
                height={40}
                className="p-2 w-[40px] h-[40px] border rounded-lg"
              />
            </a>
            <a href="">
              <Image
                src={facebook_icon}
                alt="Click here to Sign in with your facebook account"
                width={40}
                height={40}
                className="p-2 w-[40px] h-[40px] border rounded-lg"
              />
            </a>
          </div>
          <span className="">or use your email for registration</span>
          <form
            action={dispatchSignUp}
            className="flex flex-col gap-2 w-3/4 items-center"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="bg-gray-200 text-gray-400 p-2 rounded-lg w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="bg-gray-200 text-gray-400 p-2 rounded-lg w-full"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              minLength={6}
              className="bg-gray-200 text-gray-400 p-2 rounded-lg w-full"
            />
            <span>message: {signUpErrorMessage}</span>
            <button
              type="submit"
              className=" font-semibold w-[40%] p-2 rounded-md bg-interactive-green text-white"
            >
              SIGN UP
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default InputFormPortrait;
