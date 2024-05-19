import facebook_icon from "@/public/auth-form-icons/facebook-f.svg";
import github_icon from "@/public/auth-form-icons/github.svg";
import google_icon from "@/public/auth-form-icons/google-plus-g.svg";
import linkedIn_icon from "@/public/auth-form-icons/linkedin-in.svg";

const InputFormPortrait = ({ action }: { action: string }) => {
  const handleFormSubmit = () => {
    // todo:
  };
  return (
    <>
      {action === "signIn" && (
        <div className="w-full  flex flex-col items-center justify-center signin-form-portrait">
          <span className="font-bold text-[35px]">Sign In</span>
          <div className="flex flex-row gap-2">
            <a href="">
              <img
                src={google_icon}
                alt="Click here to Sign in with your google account"
                className="p-2 w-[40px] h-[40px] border rounded-lg"
              />
            </a>
            <a href="">
              <img
                src={facebook_icon}
                alt="Click here to sign in with your facebook account"
                className="p-2 w-[40px] h-[40px] border rounded-lg"
              />
            </a>
            <a href="">
              <img
                src={github_icon}
                alt="Click here to sign in with your github account"
                className="p-2 w-[40px] h-[40px] border rounded-lg"
              />
            </a>
            <a href="">
              <img
                src={linkedIn_icon}
                alt="Click here to sign in with your linked in account"
                className="p-2 w-[40px] h-[40px] border rounded-lg"
              />
            </a>
          </div>
          <span className="">or use your email and password</span>
          <form
            onSubmit={handleFormSubmit}
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
              className=" bg-gray-200 text-gray-400 p-2 rounded-lg w-full"
            />
            <span className="">forgot your password?</span>
            <button
              type="submit"
              className=" font-semibold w-[40%] p-2 rounded-md bg-indigo-950 text-white"
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
              <img
                src={google_icon}
                alt="Click here to Sign up with your google account"
                className="p-2 w-[40px] h-[40px] border rounded-lg"
              />
            </a>
            <a href="">
              <img
                src={facebook_icon}
                alt="Click here to sign up with your facebook account"
                className="p-2 w-[40px] h-[40px] border rounded-lg"
              />
            </a>
            <a href="">
              <img
                src={github_icon}
                alt="Click here to sign up with your github account"
                className="p-2 w-[40px] h-[40px] border rounded-lg"
              />
            </a>
            <a href="">
              <img
                src={linkedIn_icon}
                alt="Click here to sign up with your linked in account"
                className="p-2 w-[40px] h-[40px] border rounded-lg"
              />
            </a>
          </div>
          <span className="">or use your email for registration</span>
          <form
            onSubmit={handleFormSubmit}
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
              className="bg-gray-200 text-gray-400 p-2 rounded-lg w-full"
            />
            <button
              type="submit"
              className=" font-semibold w-[40%] p-2 rounded-md bg-indigo-950 text-white"
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
