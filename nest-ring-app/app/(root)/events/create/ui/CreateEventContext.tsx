"use client";

import { createContext, useState, ReactNode, useMemo } from "react";
import { Step1Type, Step2Type, Step3Type } from "./interface";

export const CreateEventContext = createContext({
  step1Values: {} as Step1Type,
  activeStep: "" as string,
  step2Values: {} as Step2Type,
  step3Values: {} as Step3Type,
  updateStep1Values: (data: Step1Type) => {},
  updateActiveStep: (step: string) => {},
  updateStep2Values: (data: Step2Type) => {},
  updateStep3Values: (data: Step3Type) => {},
});

const CreateEventContextProvider = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const [activeStep, setActiveStep] = useState("step_1");
  const [step1Values, setStep1Values] = useState<Step1Type>({
    category: "other",
    subject: "",
    description: "",
  });
  const [step2Values, setStep2Values] = useState<Step2Type>({
    imageFile: null,
    imageDataUrl: null,
    datePickedFrom: null,
    datePickedTo: null,
    timePickedFrom: "",
    timePickedTo: "",
    location: "",
  });
  const [step3Values, setStep3Values] = useState<Step3Type>({
    invitedGuests: [],
    isOpenToAll: false,
  });

  const contextValues = useMemo(() => {
    const updateStep1Values = (data: Step1Type) => {
      setStep1Values({ ...data });
    };

    const updateActiveStep = (step: string) => {
      setActiveStep(step);
    };

    const updateStep2Values = (data: Step2Type) => {
      setStep2Values({ ...data });
    };

    const updateStep3Values = (data: Step3Type) => {
      setStep3Values({ ...data });
    };

    return {
      step1Values,
      step2Values,
      step3Values,
      activeStep,
      updateStep1Values,
      updateActiveStep,
      updateStep2Values,
      updateStep3Values,
    };
  }, [step1Values, activeStep, step2Values, step3Values]);

  return (
    <CreateEventContext.Provider value={contextValues}>
      {children}
    </CreateEventContext.Provider>
  );
};

export default CreateEventContextProvider;
