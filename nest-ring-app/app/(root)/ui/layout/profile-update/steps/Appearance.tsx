import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit3Icon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
import { ProfileUpdateContext } from "../ProfileUpdateContext";
import { useFormState } from "react-dom";
import { deleteImagesByUrl } from "@/app/(root)/lib/utils";

const Appearance = () => {
  const { appearance, updateAppearance, updateActiveStep } =
    useContext(ProfileUpdateContext);
  const [deleteStatus, deletePhoto] = useFormState(deleteImagesByUrl, undefined);

  return (
    <section className="w-full h-full text-black p-2 flex flex-col gap-2">
      <DialogHeader>
        <DialogDescription>
          To update your Profile Appearance upload one image for your banner and
          one image for your personal profile.
        </DialogDescription>
      </DialogHeader>

      {/* Appearance */}
      <div className="relative w-full h-full">
        {/* Profile banner */}
        <div className="relative w-full h-[50%]">
          <Input
            id="profile-banner-input"
            type="file"
            className=" absolute inset-0 opacity-0"
            onChange={(event) => {
              if (event?.currentTarget.files) {
                const file = event.currentTarget.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = (e) =>
                    updateAppearance({
                      ...appearance,
                      profileBannerURL: e.target?.result,
                      profileBannerFile: file,
                    });
                } else {
                  updateAppearance({
                    ...appearance,
                    profileBannerFile: null,
                  });
                }
              }
            }}
          />
          <Image
            id="profile-banner-image-PU"
            src={
              appearance.profileBannerURL ??
              "/random-images/profile-banner.jpeg"
            }
            alt=""
            fill
          />
          <Button
            variant={"ghost"}
            onClick={() => {
              const input = document.getElementById("profile-banner-input");

              if (input) {
                input.click();
              }
            }}
            className=" absolute right-2 bottom-2 flex flex-row items-center gap-1 bg-interactive-green text-white"
          >
            <span>change photo</span> <Edit3Icon className=" h-[80%] " />
          </Button>
        </div>

        {/* profile icons */}
        <div className=" absolute top-[35%] left-3">
          <Input
            id="profile-avatar-input"
            type="file"
            className=" absolute inset-0 opacity-0"
            onChange={(event) => {
              if (event?.currentTarget.files) {
                const file = event.currentTarget.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = (e) =>
                    updateAppearance({
                      ...appearance,
                      profileAvatarURL: e.target?.result,
                      profileAvatarFile: file,
                    });
                }
              }
            }}
          />
          <Image
            src={
              appearance.profileAvatarURL ?? "/random-images/profile-avatar.png"
            }
            alt=""
            width={100}
            height={100}
            className=" w-[100px] h-[100px] rounded-full bg-white"
          />
          <button
            onClick={() => {
              const input = document.getElementById("profile-avatar-input");

              if (input) {
                input.click();
              }
            }}
            className=" absolute right-0 bottom-2 flex flex-row items-center gap-1 bg-interactive-green text-white rounded-full p-2"
          >
            <Edit3Icon className=" w-[15px] h-[15px] " />
          </button>
        </div>
      </div>
            {
              deleteStatus && (
                <span className="text-xs font-light text-figma-brown">{deleteStatus}</span>
              )
            }
      {/* footer */}
      <DialogFooter>
        <Button
          variant={"ghost"}
          className="border-2 border-interactive-green text-interactive-green bg-transparent"
          onClick={() => {
            const payload = new FormData();
            payload.append("url", appearance.profileAvatarURL);
            payload.append("type", "profile Photo");
            deletePhoto(payload);
            updateAppearance({
              ...appearance,
              profileAvatarFile: null,
              profileAvatarURL: null,
            })
          }}
        >
          <Trash2Icon /> Profile Photo
        </Button>
        <Button
          variant={"ghost"}
          className="border-2 border-interactive-green text-interactive-green bg-transparent"
          onClick={() => {
            const payload = new FormData();
            payload.append("url", appearance.profileBannerURL);
            payload.append("type", "profile Banner");
            deletePhoto(payload);
            updateAppearance({
              ...appearance,
              profileBannerURL: null,
              profileBannerFile: null,
            })
          }}
        >
          <Trash2Icon /> Banner Photo
        </Button>
        <Button
          variant={"secondary"}
          onClick={() => {
            updateActiveStep(2);
          }}
          className=" bg-interactive-green text-white hover:bg-interactive-green hover:scale-110"
        >
          Next
        </Button>
      </DialogFooter>
    </section>
  );
};

export default Appearance;
