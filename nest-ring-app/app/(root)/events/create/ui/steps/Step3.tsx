import { useContext } from "react";
import AsyncSelect from "react-select";
import { CreateEventContext } from "../CreateEventContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";

/* 3. Invite guests */
const Step3 = () => {
  const { step3Values, updateActiveStep } = useContext(CreateEventContext);

  const handleNext = () => {
    updateActiveStep("step_4");
  };
  return (
    <section className="w-full flex flex-col gap-4 p-5">
      {/* Introductory message */}
      <h1 className="text-xl font-semibold font-serif text-figma-brown">
        Invite your Guests and Monetize your event,
      </h1>

      {/* Invite the guests */}
      <div>
        <span className="text-md">
          Search a person's name to add them as your guest. They'll be notified.
        </span>
        <AsyncSelect
          options={[
            {
              value: "item 1",
              label: (
                <button className=" flex flex-row items-center justify-start gap-3">
                  <Image
                    src={"/random-images/profile-avatar.png"}
                    alt=""
                    width={20}
                    height={20}
                    className="border rounded-full "
                  />
                  <span>Item 1</span>
                </button>
              ),
            },
          ]}
        />
        {/* selected guests */}
        <div className=" w-full border rounded-lg p-3 flex flex-col gap-2 mt-3">
          {step3Values.isOpenToAll ? (
            <span className="text-md font-bold text-center">Invited All</span>
          ) : (
            step3Values.invitedGuests.map((guest) => (
              <div
                key={guest.userId}
                className=" w-full flex flex-row items-center justify-between border rounded-md p-1"
              >
                <div className=" flex flex-row items-center gap-1">
                  <Image
                    src={guest.imageUrl || "/random-images/profile-avatar.png"}
                    alt=""
                    width={20}
                    height={20}
                    className=" rounded-full "
                  />
                  <span className=" text-sm ">{guest.name}</span>
                </div>
              </div>
            ))
          )}
          {step3Values.invitedGuests.length < 1 && !step3Values.isOpenToAll && (
            <span className="text-md font-bold text-center">
              No Guests invited.
            </span>
          )}
        </div>
      </div>

      {/* Monetization */}

      {/* Navigation buttons */}
      <div className="w-full flex flex-row items-center justify-between">
        <Button
          type="button"
          onClick={() => updateActiveStep("step_2")}
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

export default Step3;
