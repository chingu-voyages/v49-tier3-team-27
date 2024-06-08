"use client";

import { DatePicker } from "rsuite";
import { Edit3Icon } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { CreateEventContext } from "../CreateEventContext";
import { toast } from "@/components/ui/use-toast";

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

      {/* date and time */}
      <div className="w-full flex flex-col space-x-3 max-sm:space-y-3 max-sm:items-start">
        <span className="text-md">
          Add the date and time when the Event will take occur
        </span>
        <div className="w-full flex flex-row max-lg:flex-col lg:items-center justify-start gap-5">
          {/* Date Picker */}
          <div className="flex flex-row items-center max-sm:justify-start gap-5">
            <div className="sm:w-[200px] flex flex-col">
              <label
                htmlFor="create-event-date-picker-from"
                className="text-sm "
              >
                From Date:
              </label>
              {/* Date picker */}
              <DatePicker
                id="create-event-date-picker-from"
                defaultValue={step2Values.datePickedFrom}
                onChange={(date: Date | null) => {
                  updateStep2Values({
                    ...step2Values,
                    datePickedFrom: date,
                  });
                  if (date) {
                    toast({
                      title: "Event Start Date Set to:",
                      description: (
                        <pre>
                          <code>
                            {JSON.stringify(
                              `${date?.getFullYear()}-${
                                date?.getMonth() + 1
                              }-${date?.getDate()}`,
                              null,
                              2
                            )}
                          </code>
                        </pre>
                      ),
                    });
                  } else {
                    toast({
                      title: "Alert!",
                      description: "Event Date has been Removed",
                      variant: "destructive",
                    });
                  }
                }}
              />
            </div>
            <div className="sm:w-[200px] flex flex-col">
              <label htmlFor="create-event-date-picker-to" className="text-sm ">
                To Date:
              </label>
              {/* Date picker */}
              <DatePicker
                id="create-event-date-picker-to"
                defaultValue={step2Values.datePickedTo}
                onChange={(date: Date | null) => {
                  updateStep2Values({
                    ...step2Values,
                    datePickedTo: date,
                  });
                  if (date) {
                    toast({
                      title: "Event End Date Set to:",
                      description: (
                        <pre>
                          <code>
                            {JSON.stringify(
                              `${date?.getFullYear()}-${
                                date?.getMonth() + 1
                              }-${date?.getDate()}`,
                              null,
                              2
                            )}
                          </code>
                        </pre>
                      ),
                    });
                  } else {
                    toast({
                      title: "Alert!",
                      description: "Event Date has been Removed",
                      variant: "destructive",
                    });
                  }
                }}
              />
            </div>
          </div>

          {/* Time picker */}
          <div className="flex flex-row items-center gap-5">
            <div className="sm:w-[115px] flex flex-col">
              <label
                htmlFor="create-event-time-picker-from"
                className="text-sm "
              >
                Starts At:
              </label>
              {/* Time picker */}
              <Input
                type="time"
                id="create-event-time-picker-from"
                defaultValue={step2Values.timePickedFrom}
                onChange={(event) => {
                  const value = event.currentTarget.value;
                  if (value) {
                    updateStep2Values({
                      ...step2Values,
                      timePickedFrom: value,
                    });
                    toast({
                      title: "Event Start time Set to:",
                      description: (
                        <pre>
                          <code>{JSON.stringify(value, null, 2)}</code>
                        </pre>
                      ),
                    });
                  }
                }}
              />
            </div>
            <div className="sm:w-[115px] flex flex-col">
              <label htmlFor="create-event-time-picker-to" className="text-sm ">
                Ends at:
              </label>
              {/* Time picker */}
              <Input
                type="time"
                id="create-event-time-picker-to"
                defaultValue={step2Values.timePickedTo}
                onChange={(event) => {
                  const value = event.currentTarget.value;
                  if (value) {
                    updateStep2Values({
                      ...step2Values,
                      timePickedTo: value,
                    });
                    toast({
                      title: "Event End time Set to:",
                      description: (
                        <pre>
                          <code>{JSON.stringify(value, null, 2)}</code>
                        </pre>
                      ),
                    });
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="w-full flex flex-col space-x-3 space-y-1 max-sm:items-start">
        <span className="text-md">
          We are working on adding google Maps, but for now provide a text
          description of the Location.
        </span>
        <Input
          type="text"
          placeholder="Location... Max 15 characters"
          maxLength={15}
          value={step2Values.location}
          onChange={(event) => {
            const value = event.currentTarget.value;
            updateStep2Values({
              ...step2Values,
              location: value,
            });
          }}
        />
      </div>

      {/* Image select from users computer drive */}
      <div className="flex flex-col items-start justify-start space-x-3">
        <span className="text-md">
          Add an Image to help your guests have an impression of what to expect
          at the event.
        </span>
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
            src={
              step2Values.imageDataUrl ?? "/random-images/profile-banner.jpeg"
            }
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
      </div>

      {/* Navigation buttons */}
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
