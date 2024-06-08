import User from "@/lib/models/User";
import dbConnect from "@/lib/mongo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const keyword = req.nextUrl.searchParams.get("name");

    let result = [];
    if (keyword) {
      await dbConnect();

      const keywordRegex = new RegExp("." + "*" + keyword);
      result = await User.find({
        name: { $regex: keywordRegex, $options: "si" },
      });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 500 });
  }
}
