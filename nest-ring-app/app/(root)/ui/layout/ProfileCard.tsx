import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import ProfileUpdate from "./profile-update/ProfileUpdate";

const ProfileCard = () => {
  const { data } = useSession() as any;

  return (
    <section className=" w-full xl:h-[20vw] md:h-[25vw]  bg-white rounded-lg flex flex-col justify-between lg:pb-4 md:pb-2">
      {/* Profile avatar and background banner */}
      <div className=" w-full relative">
        <Image
          src={data?.user?.bannerUrl || "/random-images/profile-banner.jpeg"}
          alt=""
          width={1400}
          height={1000}
          className=" w-full h-[5vw] rounded-t-lg"
        />
        <div className=" w-full absolute top-3 flex flex-row justify-center">
          <ProfileUpdate showByDefault={false} hideTrigger={false} />
        </div>
      </div>

      <Link href={"/profile"} className=" flex flex-col lg:gap-6 gap-2">
        {/* users full name */}
        <span className=" font-bold text-md text-center hover:underline">
          {data?.user?.name || "Your Name"}
        </span>

        {/* user description */}
        <span className=" font-light text-sm underline underline-offset-4 text-center px-2">
          {data?.user?.description ||
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae dolor nisi"}
        </span>
      </Link>
    </section>
  );
};

export default ProfileCard;
