"use client";
import React, { useContext } from "react";
import { CreateEventContext } from "../CreateEventContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Step5 = () => {
  const {
    step1Values,
    step2Values,
    step3Values,
    cartItems,
    isUploading,
    updateActiveStep,
    uploadNewEvent,
  } = useContext(CreateEventContext);

  const handleNext = async () => {
    await uploadNewEvent();
  };

  return (
    <section className="w-full flex flex-col gap-4 p-5">
      {/* Introductory message */}
      <h1 className="text-xl font-semibold font-serif text-figma-brown">
        Preview your newly Created Event and Confirm.
      </h1>

      <div className="flex flex-col gap-2 p-2 border rounded-md">
        <div className="flex flex-col gap-1 border-b">
          <label
            htmlFor="new-event-category-confirmation"
            className="text-sm font-bold underline"
          >
            Category:
          </label>
          <span id="new-event-category-confirmation" className="text-md">
            {step1Values.category}
          </span>
        </div>
        <div className="flex flex-col gap-1 border-b">
          <label
            htmlFor="new-event-category-confirmation"
            className="text-sm font-bold underline"
          >
            Subject:
          </label>
          <span id="new-event-category-confirmation" className="text-md">
            {step1Values.subject}
          </span>
        </div>
        <div className="flex flex-col gap-1 ">
          <label
            htmlFor="new-event-category-confirmation"
            className="text-sm font-bold underline"
          >
            Description:
          </label>
          <span id="new-event-category-confirmation" className="text-md">
            {step1Values.description}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-2 border rounded-md">
        {/* date and time */}
        <div className="flex flex-col border-b">
          <label
            htmlFor="new-event-date-time-confirmation"
            className="text-sm font-bold underline"
          >
            Date and Time:
          </label>
          <div
            id="new-event-date-time-confirmation"
            className="flex flex-row flex-wrap justify-start items-center px-3 gap-8"
          >
            {/* Date and time */}
            <div className=" flex flex-col gap-1">
              <label
                htmlFor="new-event-date-from-confirmation"
                className="text-sm font-bold underline"
              >
                From:
              </label>
              <span
                id={"new-event-date-from-confirmation"}
              >{`${step2Values?.datePickedFrom?.getFullYear()}-${
                step2Values?.datePickedFrom?.getMonth() || 0 + 1
              }-${step2Values?.datePickedFrom?.getDate()}`}</span>
            </div>
            <div className=" flex flex-col gap-1">
              <label
                htmlFor="new-event-date-from-confirmation"
                className="text-sm font-bold underline"
              >
                To:
              </label>
              <span
                id={"new-event-date-from-confirmation"}
              >{`${step2Values?.datePickedTo?.getFullYear()}-${
                step2Values?.datePickedTo?.getMonth() || 0 + 1
              }-${step2Values?.datePickedTo?.getDate()}`}</span>
            </div>
            <div className=" flex flex-col gap-1">
              <label
                htmlFor="new-event-time-start-confirmation"
                className="text-sm font-bold underline"
              >
                Start At:
              </label>
              <span
                id={"new-event-time-start-confirmation"}
              >{`${step2Values?.timePickedFrom}`}</span>
            </div>
            <div className=" flex flex-col gap-1">
              <label
                htmlFor="new-event-time-end-confirmation"
                className="text-sm font-bold underline"
              >
                Start End:
              </label>
              <span
                id={"new-event-time-end-confirmation"}
              >{`${step2Values?.timePickedTo}`}</span>
            </div>
          </div>
        </div>
        {/* location */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="new-event-location-confirmation"
            className="text-sm font-bold underline"
          >
            Location:
          </label>
          <span id="new-event-location-confirmation" className=" text-md">
            {step2Values.location}
          </span>
        </div>
        {/* image */}
        <div className=" w-full flex flex-col gap-1">
          <label
            htmlFor="new-event-image-confirmation"
            className="text-sm font-bold underline"
          >
            Image:
          </label>
          <Image
            id="new-event-image-confirmation"
            src={
              step2Values.imageDataUrl ?? "/random-images/profile-banner.jpeg"
            }
            alt=""
            width={400}
            height={300}
            className=" w-auto h-auto max-h-[300px] object-contain"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 p-2 border rounded-md">
        {/* guests */}
        <div className=" w-full flex flex-col gap-1 border p-1 rounded-md">
          <label
            htmlFor="new-event-image-confirmation"
            className="text-sm font-bold underline"
          >
            Guests:
          </label>
          <div className="flex flex-col gap-1 max-h-[250px]">
            {step3Values.isOpenToAll ? (
              <span className="text-md font-bold text-start">Invited All</span>
            ) : (
              step3Values.invitedGuests.map((guest) => (
                <div
                  key={guest.userId}
                  className=" w-full flex flex-row items-center justify-start border rounded-md p-2 bg-slate-100 gap-3"
                >
                  <Image
                    src={guest.imageUrl || "/random-images/profile-avatar.png"}
                    alt=""
                    width={25}
                    height={25}
                    className=" rounded-full object-cover"
                  />
                  <span className=" text-sm font-mono">{guest.name}</span>
                </div>
              ))
            )}
            {step3Values.invitedGuests.length < 1 &&
              !step3Values.isOpenToAll && (
                <span className="text-md font-bold text-center">
                  No Guests invited.
                </span>
              )}
          </div>
        </div>

        {/* monetization */}
        <div className=" w-full flex flex-col gap-1 border p-1 rounded-md">
          <label
            htmlFor="new-event-monetization-confirmation"
            className="text-sm font-bold underline"
          >
            Monetization:
          </label>
          <div
            id="new-event-monetization-confirmation"
            className="flex flex-row max-sm:flex-col sm:items-center sm:justify-between p-1"
          >
            <div className="flex flex-col">
              <span className="text-sm">Decision:</span>
              <span>
                {step3Values.monetization.type === "contribution" &&
                  "I want the guests to optionally contribute"}
                {step3Values.monetization.type === "fee" &&
                  "I want to charge an attendance fee to the guests"}
                {step3Values.monetization.type === "off" &&
                  "I don't want to monetize my event"}
              </span>
            </div>
            {(step3Values.monetization.type == "contribution" ||
              step3Values.monetization.type == "fee") && (
              <div className=" flex flex-row items-center gap-1">
                <span>Amount:</span>
                <span>{step3Values.monetization.amount}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        id="new-event-cart-items-confirmation"
        className="flex flex-col gap-2 p-2 border rounded-md max-h-[350px] overflow-hidden overflow-y-auto"
      >
        <label
          htmlFor="new-event-cart-items-confirmation"
          className="text-sm font-bold underline"
        >
          Your Event Menu:
        </label>
        {cartItems.map((item) => (
          <div
            key={item.slug}
            className=" rounded-md border  p-2 flex flex-row gap-2"
          >
            <Image
              src={item.imageUrl || "/order-meal/food-image.png"}
              alt=""
              width={100}
              height={100}
              className=" rounded-sm"
            />
            <div className=" flex flex-col">
              <span className="font-semibold">{item.name}</span>
              <span>{item.description}</span>
              <span>Qty: {item.count}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="w-full flex flex-row items-center justify-between">
        <Button
          type="button"
          onClick={() => updateActiveStep("step_4")}
          className=" bg-interactive-green hover:bg-interactive-green text-white hover:bg-opacity-80 self-end"
        >
          Back
        </Button>
        <Button
          type="button"
          disabled={isUploading}
          onClick={handleNext}
          className=" bg-interactive-green hover:bg-interactive-green text-white hover:bg-opacity-80 self-end"
        >
          {isUploading ? (
            <Image
              src={"/random-images/dots-loader.svg"}
              alt=""
              width={30}
              height={20}
            />
          ) : (
            <span>Confirm</span>
          )}
        </Button>
      </div>
    </section>
  );
};

export default Step5;
