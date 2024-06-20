"use client";
import { Button } from "@/components/ui/button";
import { MoveLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const PrevPageBtn = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.back();
      }}
      className="w-[50px] sticky top-2 bg-transparent hover:bg-interactive-green hover:text-white text-interactive-green"
    >
      <MoveLeftIcon />
    </Button>
  );
};

export default PrevPageBtn;
