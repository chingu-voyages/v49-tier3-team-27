import { useState } from "react";
import InfoBanner from "./InfoBanner";
import InputForm from "./InputForm";
import InputFormPortrait from "./InputFormPortrait";
import InfoBannerPortrait from "./InfoBannerPortrait";

const MainCard = () => {
  const [action, setAction] = useState("signIn");
  return (
    <>
      <div className="w-[65%] h-[65%] rounded-xl bg-white flex relative max-md:hidden">
        <InputForm action={action} />
        <InfoBanner action={action} setAction={setAction} />
      </div>
      <div className="w-[95%] h-[93%] rounded-xl bg-white flex flex-col relative md:hidden gap-3">
        <InfoBannerPortrait action={action} setAction={setAction} />
        <InputFormPortrait action={action} />
      </div>
    </>
  );
};

export default MainCard;
