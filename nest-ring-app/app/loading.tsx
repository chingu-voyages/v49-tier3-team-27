import Image from "next/image";

export default function Loading() {
  return (
    <main className=" w-full h-screen flex items-center justify-center bg-slate-100">
      <Image
        src={"/app-logo-png.png"}
        alt="Welcome to Nestring Hotel Website."
        width={1400}
        height={1000}
        loading="lazy"
        className=" w-[100px] h-[130px] animate-bounce ease-in-out repeat-infinite duration-1000"
      />
    </main>
  );
}
