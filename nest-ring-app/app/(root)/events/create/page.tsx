"use client";

import React, { useContext } from "react";
import Step1 from "./ui/steps/Step1";
import PrevPageBtn from "../../order-meal/[searchTerm]/ui/PrevPageBtn";
import { CreateEventContext } from "./ui/CreateEventContext";
import Step2 from "./ui/steps/Step2";
import Step3 from "./ui/steps/Step3";

const CreateEventMainPage = () => {
  const { activeStep } = useContext(CreateEventContext);
  return (
    <main className="w-full h-full overflow-hidden overflow-y-auto bg-white rounded-lg p-3 max-sm:pb-20">
      <div className="w-full bg-white">
        <PrevPageBtn />
      </div>
      {/* 1. Category, Subject, Description */}
      {activeStep === "step_1" && <Step1 />}
      {/* 2. Image upload, event Date and time, Event location */}
      {activeStep === "step_2" && <Step2 />}
      {/* 3. Invite guests */}
      {activeStep === "step_3" && <Step3 />}
      {/* 4. Book event Dishes */}
      {/* 5. Preview of event creation and set to create.*/}
    </main>
  );
};

export default CreateEventMainPage;
