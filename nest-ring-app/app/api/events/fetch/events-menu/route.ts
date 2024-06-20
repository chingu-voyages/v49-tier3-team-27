import { CategoryItems } from "@/app/(root)/order-meal/lib/interface";
import { getEventMenu } from "@/app/(root)/order-meal/lib/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const results = (await getEventMenu()) as CategoryItems[];

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.log("api error fetching events menu: ", error);
    return NextResponse.json(
      { message: "Internal system Error" },
      { status: 500 }
    );
  }
};
