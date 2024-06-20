import EventsTabFoodMenu from "../EventsTabFoodMenu";
import { useContext } from "react";
import { CreateEventContext } from "../CreateEventContext";
import { Button } from "@/components/ui/button";

const Step4 = () => {
  const { updateActiveStep } = useContext(CreateEventContext);
  return (
    <section className="w-full flex flex-col gap-4 p-1">
      <div className=" w-full flex flex-row items-center justify-between">
        <h1 className="text-xl font-semibold font-serif text-figma-brown">
          Select Dishes
        </h1>

        <div className=" flex flex-row gap-1 items-center">
          {/* Navigation buttons */}
          <Button
            type="button"
            onClick={() => updateActiveStep("step_3")}
            className=" bg-interactive-green hover:bg-interactive-green text-white hover:bg-opacity-80 self-start  justify-self-end"
          >
            Back
          </Button>
          <Button
            type="button"
            onClick={() => updateActiveStep("step_5")}
            className=" bg-interactive-green hover:bg-interactive-green text-white hover:bg-opacity-80 self-end"
          >
            Preview
          </Button>
        </div>
      </div>
      <span className="text-sm">
        Let us handle the meals preping, cooking, delivery and service for you.
        Browse through our Multiculture cuisines. Enjoy!
      </span>
      <EventsTabFoodMenu />
    </section>
  );
};

export default Step4;
