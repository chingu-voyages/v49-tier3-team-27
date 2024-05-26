import Link from "next/link";

const ManageNotifCard = () => {
  return (
    <section className=" w-full  bg-white rounded-lg flex flex-col p-2">
      <span className=" font-bold text-lg ">Manage your Notification</span>
      <Link
        href={"/profile/notification"}
        className=" font-semibold text-md text-interactive-green hover:underline"
      >
        View Settings
      </Link>
    </section>
  );
};

export default ManageNotifCard;
