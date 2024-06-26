import facebook_icon from "@/public/auth-form-icons/facebook-f.svg";
import google_icon from "@/public/auth-form-icons/google-plus-g.svg";
import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";
import { login, signUpUser } from "../lib/action";
import signUpIcon from "@/public/login-ui/signup-icon.svg";
import loginIcon from "@/public/login-ui/login-icon.svg";

const InputForm = ({ action }: { action: string }) => {
  const [loginErrorMessage, dispatchLogin] = useFormState(login, undefined);
  const [signUpErrorMessage, dispatchSignUp] = useFormState(
    signUpUser,
    undefined
  );

  const formStatus = useFormStatus();

  return (
    <>
      {action === "signIn" && (
        <div className="w-1/2 h-[100%]  flex flex-col items-center justify-center signin-form-desktop">
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
            {loginErrorMessage && (
              <span className=" text-sm text-red-500">{loginErrorMessage}</span>
            )}
            <button
              type="submit"
              className=" font-semibold w-[40%] p-2 rounded-md bg-interactive-green text-white flex items-center gap-2 justify-center "
            >
              {formStatus.pending ? (
                <>
                  <div className="w-[20px] h-[20px] rounded-full border-white border-t-2 border-l-0 border-r-0 border-b-2 animate-spin repeat-infinite duration-500" />
                </>
              ) : (
                <>
                  <span>SIGN IN</span>
                  <Image src={loginIcon} alt="" width={20} height={20} />
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {action === "signUp" && (
        <div className="w-1/2 h-[100%] flex flex-col items-center justify-center signup-form-desktop">
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
            {signUpErrorMessage && (
              <span className=" text-sm text-red-500">
                {signUpErrorMessage}
              </span>
            )}
            <button
              type="submit"
              className=" font-semibold w-[40%] p-2 rounded-md bg-interactive-green text-white flex items-center gap-2 justify-center "
            >
              {formStatus.pending ? (
                <>
                  <div className="w-[20px] h-[20px] rounded-full border-white border-t-2 border-l-0 border-r-0 border-b-2 animate-spin repeat-infinite duration-500" />
                </>
              ) : (
                <>
                  <span>SIGN UP</span>
                  <Image src={loginIcon} alt="" width={20} height={20} />
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default InputForm;
