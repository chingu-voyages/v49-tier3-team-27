import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { ProfileUpdateContext } from "../ProfileUpdateContext";
import { Input } from "@/components/ui/input";
import {
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

const Confirmation = () => {
  const {
    credentials,
    updateCredentials,
    activeStep,
    updateActiveStep,
    uploadData,
  } = useContext(ProfileUpdateContext);

  return (
    <section className="w-full">
      <form className="w-full space-y-3">
        <DialogHeader>
          <DialogDescription>
            To complete your Profile Update, please confirm it&apos;s you. Thank
            you.
          </DialogDescription>
        </DialogHeader>
        <div className=" flex flex-col">
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Email
          </label>
          <Input
            placeholder="all@email.com"
            value={credentials.email || ""}
            onChange={(e) => {
              const value = e.currentTarget.value;
              updateCredentials({
                ...credentials,
                email: value,
              });
            }}
          />
        </div>
        <div className=" flex flex-col">
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Password
          </label>
          <Input
            placeholder="...."
            name="password"
            value={credentials.password}
            onChange={(e) => {
              const value = e.currentTarget.value;
              updateCredentials({
                ...credentials,
                password: value,
              });
            }}
          />
        </div>

        {/* Tab navigation buttons */}
        <div className=" flex flex-row gap-2 pt-5">
          <Button
            type="button"
            onClick={() => {
              updateActiveStep(activeStep - 1);
            }}
            className=" border-2 border-interactive-green bg-transparent hover:bg-transparent text-interactive-green hover:scale-95"
          >
            Back
          </Button>
          <Button
            type="button"
            onClick={uploadData}
            className=" bg-interactive-green hover:bg-interactive-green hover:scale-110"
          >
            Complete
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Confirmation;
