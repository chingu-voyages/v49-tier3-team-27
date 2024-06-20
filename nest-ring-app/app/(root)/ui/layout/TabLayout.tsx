import { useState } from "react";
import Chatbot from "./Chatbot";
import LeftLayout from "./LeftLayout";
import RightLayout from "./RightLayout";

const TabLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className=" md:pt-5 w-full h-full xl:px-28 lg:px-20 md:px-10 bg-slate-100 flex flex-row justify-between items-start gap-7 overflow-hidden md:pb-10">
      {/* Left side layout */}
      <LeftLayout />
      {/* children */}
      <div className="w-full h-full overflow-hidden">{children}</div>
      {/* Right side layout */}
      <RightLayout />
      <Chatbot />
    </div>
  );
};

export default TabLayout;
