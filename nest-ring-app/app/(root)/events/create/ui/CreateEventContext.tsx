"use client";

import { createContext, useState, ReactNode, useMemo } from "react";
import { Step1Type, Step2Type, Step3Type } from "./interface";
import { EventFoodType } from "@/app/(root)/order-meal/lib/interface";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";

export const CreateEventContext = createContext({
  step1Values: {} as Step1Type,
  activeStep: "" as string,
  step2Values: {} as Step2Type,
  step3Values: {} as Step3Type,
  cartItems: [] as EventFoodType[],
  isUploading: false as boolean,
  updateStep1Values: (data: Step1Type) => {},
  updateActiveStep: (step: string) => {},
  updateStep2Values: (data: Step2Type) => {},
  updateStep3Values: (data: Step3Type) => {},
  updateCartItems: (data: EventFoodType[]) => {},
  uploadNewEvent: async () => {},
});

const CreateEventContextProvider = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const { data } = useSession() as any;
  const [isUploading, setIsUploading] = useState(false);
  const [activeStep, setActiveStep] = useState("step_1");
  const [step1Values, setStep1Values] = useState<Step1Type>({
    category: "",
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
    monetization: {
      type: "",
      amount: 0,
    },
  });
  const [cartItems, setCartItems] = useState<EventFoodType[]>([]);

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

    const updateCartItems = (data: EventFoodType[]) => {
      setCartItems([...data]);
    };

    const assemblePayload = async (): Promise<FormData> => {
      const payload = new FormData();
      payload.append("category", step1Values.category);
      payload.append("subject", step1Values.subject);
      payload.append("description", step1Values.description);
      payload.append("imageFile", step2Values.imageFile || new Blob());
      payload.append(
        "creator",
        JSON.stringify({
          userId: data?.user?.userId || "",
          imageUrl: data?.user?.avatarUrl,
          name: data?.user?.name,
        })
      );
      payload.append(
        "eventDate",
        JSON.stringify({
          fromDate: step2Values.datePickedFrom,
          toDate: step2Values.datePickedTo,
          fromTime: step2Values.timePickedFrom,
          toTime: step2Values.timePickedTo,
        })
      );
      payload.append("location", step2Values.location);
      payload.append(
        "invitedGuests",
        JSON.stringify([...step3Values.invitedGuests])
      );
      payload.append("isOpenToAll", String(step3Values.isOpenToAll));
      payload.append("monetization", JSON.stringify(step3Values.monetization));
      payload.append(
        "eventDishes",
        JSON.stringify(cartItems.map((item) => item._id))
      );
      return payload;
    };

    const uploadNewEvent = async () => {
      setIsUploading(true);
      try {
        const response = await fetch("/api/events/create", {
          method: "POST",
          body: await assemblePayload(),
        });

        if (response.status === 201) {
          updateActiveStep("success");
        } else {
          toast({
            title: "Error!",
            description: "Internal system Error. Try again later!",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.log("Failed to upload new Event to BE: ", error);
        toast({
          title: "Alert!",
          description: "Check your internet connection then try again!",
          variant: "destructive",
        });
      }
      setIsUploading(false);
    };
    return {
      step1Values,
      step2Values,
      step3Values,
      activeStep,
      cartItems,
      isUploading,
      updateStep1Values,
      updateActiveStep,
      updateStep2Values,
      updateStep3Values,
      updateCartItems,
      uploadNewEvent,
    };
  }, [
    step1Values,
    activeStep,
    step2Values,
    step3Values,
    cartItems,
    isUploading,
  ]);

  return (
    <CreateEventContext.Provider value={contextValues}>
      {children}
    </CreateEventContext.Provider>
  );
};

export default CreateEventContextProvider;
