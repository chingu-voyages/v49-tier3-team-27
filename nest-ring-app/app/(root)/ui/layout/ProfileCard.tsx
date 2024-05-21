import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const ProfileCard = () => {
  const { data } = useSession();

  return (
    <section className=" w-full xl:h-[20vw] md:h-[25vw]  bg-white rounded-lg flex flex-col justify-between lg:pb-4 md:pb-2">
      {/* Profile avatar and background banner */}
      <div className=" w-full relative">
        <Image
          src={"/random-images/profile-banner.jpg"}
          alt=""
          width={1400}
          height={1000}
          className=" w-full h-[5vw] rounded-t-lg"
        />
        <div className=" w-full absolute top-3 flex flex-row justify-center">
          <Image
            src={"/random-images/profile-avatar.png"}
            alt=""
            width={1400}
            height={1000}
            className=" w-[8vw] h-[8vw] rounded-full "
          />
        </div>
      </div>

      <div className=" flex flex-col lg:gap-6 gap-2">
        {/* users full name */}
        <span className=" font-bold text-md text-center">
          {data?.user?.name}
        </span>

        {/* user description */}
        <span className=" font-light text-sm underline underline-offset-4 text-center px-2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          dolor nisi
        </span>
      </div>
    </section>
  );
};

export default ProfileCard;
