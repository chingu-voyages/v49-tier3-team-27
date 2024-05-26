import Image from "next/image";
import bgImage from "@/public/login-ui/bg-image.svg";

const InfoBannerPortrait = ({
  action,
  setAction,
}: {
  action: string;
  setAction: (param: string) => void;
}) => {
  const handleFormType = () => {
    if (action === "signIn") {
      setAction("signUp");
    } else if (action === "signUp") {
      setAction("signIn");
    }
  };
  return (
    <>
      {action === "signIn" && (
        <div className="  w-full h-[33%] bg-figma-brown text-white signup-banner-portrait rounded-xl rounded-bl-[30%] p-2 ">
          <Image
            src={bgImage}
            alt=""
            fill
            className="rounded-xl rounded-bl-[30%] -z-10"
          />
          <div className="w-full h-full flex flex-col items-end">
            <span className=" text-start w-full font-bold text-[35px]">
              Welcome Back!
            </span>
            <p className="">
              Enter your personal details to use all the site features
            </p>
            <button
              type="button"
              onClick={handleFormType}
              className=" w-[40%] border border-white p-3 font-semibold rounded-md hover:bg-slate-800"
            >
              SIGN UP
            </button>
          </div>
        </div>
      )}

      {action === "signUp" && (
        <div className="flex flex-col w-full h-[33%] bg-figma-brown text-white signin-banner-portrait rounded-xl rounded-bl-[30%] p-2 items-end">
          <Image
            src={bgImage}
            alt=""
            fill
            className="rounded-xl rounded-bl-[30%] -z-10"
          />
          <div className="w-full h-full flex flex-col items-end">
            <span className="text-start w-full font-bold text-[35px]">
              Hello, Friend!
            </span>
            <p className=" font-light ">
              Register with your personal details to use all of site features
            </p>
            <button
              type="button"
              onClick={handleFormType}
              className=" w-[40%] border border-white p-3 font-semibold rounded-md hover:bg-slate-800"
            >
              SIGN IN
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoBannerPortrait;
