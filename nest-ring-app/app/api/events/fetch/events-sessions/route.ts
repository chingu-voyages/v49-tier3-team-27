import { fetchEventSessions } from "@/app/(root)/events/lib/util";
import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const query = new NextURL(new URL(req.url)).searchParams.get("userId");

    const results = await fetchEventSessions(query ?? null);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.log("Failed to fetch EVent sessions in db: ", error);
    return NextResponse.json(
      { message: "Internal server Error." },
      { status: 500 }
    );
  }
};
