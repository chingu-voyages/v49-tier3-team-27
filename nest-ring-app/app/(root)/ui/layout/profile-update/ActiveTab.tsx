import React, { useContext } from "react";
import { ProfileUpdateContext } from "./ProfileUpdateContext";
import Appearance from "./steps/Appearance";
import PersonalInfo from "./steps/PersonalInfo";
import MoreDetails from "./steps/MoreDetails";
import Confirmation from "./steps/Confirmation";

const ActiveTab = () => {
  const { activeStep } = useContext(ProfileUpdateContext);
  return (
    <div className="w-full h-[70%] z-0 rounded-lg">
      {/* Appearance */}
      {activeStep === 1 && <Appearance />}

      {/* PersonalInfo */}
      {activeStep === 2 && <PersonalInfo />}

      {/* More Details */}
      {activeStep === 3 && <MoreDetails />}

      {/* Confirmation */}
      {activeStep === 4 && <Confirmation />}
    </div>
  );
};

export default ActiveTab;
