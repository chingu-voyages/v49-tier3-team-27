import Image from "next/image";
import React, { useContext } from "react";
import { ProfileUpdateContext } from "./ProfileUpdateContext";
import clsx from "clsx";

const availableSteps = [
  {
    index: 1,
    title: "Appearance",
  },
  {
    index: 2,
    title: "Personal Information",
  },
  {
    index: 3,
    title: "More Details",
  },
  {
    index: 4,
    title: "Confirmation",
  },
];
const Sidebar = () => {
  const { activeStep, updateActiveStep } = useContext(ProfileUpdateContext);

  return (
    <div className=" relative mt-3 w-full h-1/4 bg-figma-brown rounded-lg z-0">
      <div className="absolute inset-0 w-full -z-10 ">
        <Image
          src={"/layout/bg-sidebar-mobile.svg"}
          alt=""
          fill
          className="rounded-lg"
        />
      </div>
      <div className=" w-full z-10">
        {/* page number */}
        <div className=" w-full flex flex-row items-center gap-3 justify-center pt-3">
          {availableSteps.map((step) => (
            <button
              key={`profile-update-step-button-${step.index}`}
              onClick={() => {
                updateActiveStep(step.index);
              }}
              className={`w-8 h-8  rounded-full border-dotted text-white font-bold text-sm text-center ${
                step.index == activeStep
                  ? "border-none bg-white text-figma-brown"
                  : "border-2 border-white "
              }`}
            >
              {step.index}
            </button>
          ))}
        </div>
        {/* page label */}
        <div className="absolute bottom-2 left-2 w-full z-10">
          {availableSteps.map((step) => (
            <span
              key={`profile-update-step-display-${step.title}`}
              className={clsx(" block text-white text-xl", {
                " hidden": step.index !== activeStep,
              })}
            >
              {step.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
