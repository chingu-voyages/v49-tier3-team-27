"use client";

import { DatePicker } from "rsuite";
import { Edit3Icon } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { CreateEventContext } from "../CreateEventContext";

/* 2. Image upload, event Date and time, Event location */
const Step2 = () => {
  const { step2Values, updateStep2Values, updateActiveStep } =
    useContext(CreateEventContext);

  const handleNext = () => {
    updateActiveStep("step_3");
  };

  return (
    <section className="w-full flex flex-col gap-4 p-5">
      {/* Introductory message */}
      <h1 className="text-xl font-semibold font-serif text-figma-brown">
        Expressive Image, Event Date, time and Location:
      </h1>
      <h2 className="text-md">
        Add an Image to help your guests have an impression of what to expect at
        the event. and the event location.
      </h2>

      {/* Image select from users computer drive */}
      <div className="relative w-full max-h-[25%]">
        <Input
          id="create-event-image-input"
          type="file"
          className=" absolute inset-0 opacity-0"
          onChange={(event) => {
            if (event?.currentTarget.files) {
              const file = event.currentTarget.files[0];
              if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) =>
                  updateStep2Values({
                    ...step2Values,
                    imageDataUrl: e.target?.result,
                    imageFile: file,
                  });
              } else {
                updateStep2Values({
                  ...step2Values,
                  imageFile: null,
                });
              }
            }
          }}
        />
        <Image
          id="create-event-image-preview"
          src={step2Values.imageDataUrl ?? "/random-images/profile-banner.jpeg"}
          alt=""
          width={400}
          height={300}
          className=" w-auto h-auto max-h-[300px]"
        />
        <Button
          variant={"ghost"}
          onClick={() => {
            const input = document.getElementById("create-event-image-input");

            if (input) {
              input.click();
            }
          }}
          className=" absolute right-2 bottom-2 flex flex-row items-center gap-1 bg-interactive-green text-white"
        >
          <span>change photo</span> <Edit3Icon className=" h-[80%] " />
        </Button>
      </div>

      {/* date and time */}
      <div className="w-full flex flex-col space-x-3">
        <h2 className="text-md">Add the date when the Event will take occur</h2>
        <div className="w-full flex flex-row items-center justify-start gap-5">
          <div className="w-[200px] flex flex-col">
            <label htmlFor="create-event-date-picker" className="text-sm ">
              Input or Select Date:
            </label>
            {/* Date picker */}
            <DatePicker id="create-event-date-picker" />
          </div>
          <div className="w-[200px] flex flex-col">
            <label htmlFor="create-event-time-picker" className="text-sm ">
              Input or Select time:
            </label>
            {/* Time picker */}
            <Input type="time" id="create-event-time-picker" />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-row items-center justify-between">
        <Button
          type="button"
          onClick={() => updateActiveStep("step_1")}
          className=" bg-interactive-green hover:bg-interactive-green text-white hover:bg-opacity-80 self-end"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          className=" bg-interactive-green hover:bg-interactive-green text-white hover:bg-opacity-80 self-end"
        >
          Next
        </Button>
      </div>
    </section>
  );
};

export default Step2;
