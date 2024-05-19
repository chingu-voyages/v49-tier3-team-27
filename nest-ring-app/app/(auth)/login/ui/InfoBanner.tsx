const InfoBanner = ({
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
        <div className="absolute flex flex-col justify-center items-center px-4 text-center gap-4 rounded-xl rounded-tl-[30%] rounded-bl-[20%] w-1/2 h-[100%] bg-blue-950 text-white signup-banner-desktop">
          <span className="font-bold text-[35px]">Welcome Back!</span>
          <p className="">
            Enter your personal details to use all the site features
          </p>
          <button
            type="button"
            onClick={handleFormType}
            className=" w-[40%] border border-white p-3 font-semibold rounded-md hover:bg-slate-500"
          >
            SIGN UP
          </button>
        </div>
      )}

      {action === "signUp" && (
        <div className=" absolute flex flex-col justify-center items-center px-4 text-center gap-4 rounded-xl rounded-tr-[30%] rounded-br-[20%] w-1/2 h-[100%] bg-blue-950 text-white signin-banner-desktop">
          <span className=" font-bold text-[35px]">Hello, Friend!</span>
          <p className=" font-light ">
            Register with your personal details to use all of site features
          </p>
          <button
            type="button"
            onClick={handleFormType}
            className=" w-[40%] border border-white p-3 font-semibold rounded-md hover:bg-slate-500"
          >
            SIGN IN
          </button>
        </div>
      )}
    </>
  );
};

export default InfoBanner;
