import { Button } from "@/components/ui/button";
import React, { useContext } from "react";
import { ProfileUpdateContext } from "../ProfileUpdateContext";
import { DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import appLogo from "@/public/app-named-logo-png.png";

const Consent = () => {
  const { consentConclude, updateConsentConclude, updateActiveStep } =
    useContext(ProfileUpdateContext);
  return (
    <>
      {!consentConclude.consent && (
        <section className=" flex flex-col gap-8 items-start ">
          <Image src={appLogo} alt="" width={300} height={500} />
          <div className=" flex flex-col items-center gap-2">
            <span className=" text-xl font-serif">
              To offer you the <strong>Best Experience</strong>, we&apos;d like
              to request you update your Personal Profile with latest
              Information
            </span>
            <Button
              onClick={() => {
                updateConsentConclude({
                  ...consentConclude,
                  consent: true,
                });
              }}
              className=" self-center bg-interactive-green hover:bg-interactive-green text-white hover:scale-105"
            >
              Continue
            </Button>
          </div>
        </section>
      )}

      {consentConclude.conclude && (
        <section className=" flex flex-col gap-8 items-start ">
          <Image src={appLogo} alt="" width={300} height={500} />
          <div className=" flex flex-col items-center gap-2">
            <h1 className=" text-center text-3xl font-semibold text-figma-brown">
              Profile Update Complete!
            </h1>
            <span className=" text-xl font-serif">
              Thank you for your time. Enjoy the diversity of our culture; make
              it your <strong>OWN</strong>.
            </span>
            <div className=" flex gap-8 ">
              <Button
                onClick={() => {
                  updateActiveStep(1);
                  updateConsentConclude({
                    consent: true,
                    conclude: false,
                  });
                }}
                className=" self-center bg-interactive-green hover:bg-interactive-green text-white hover:scale-105"
              >
                Modify
              </Button>
              <DialogTrigger>
                <Button className=" self-center bg-interactive-green hover:bg-interactive-green text-white hover:scale-105">
                  Dismiss
                </Button>
              </DialogTrigger>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Consent;
