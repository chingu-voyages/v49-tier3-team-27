import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongo";
import Order, { IOrder } from "@/lib/models/Order";

export async function POST(request: NextRequest) {
    await dbConnect()

    try{
        const reqBody = await request.json();
        const {
          food,
          rating,
          comment,
          totalAmount,
          discount,
          payment  
        } : IOrder = reqBody;

        const newOrder = new Order({
            food,
            rating,
            comment,
            totalAmount,
            discount,
            payment
        });

        const savedOrder = await newOrder.save();

        return NextResponse.json(
            {
                message: "New Order created successfully",
                savedOrder,
            },
            { status: 201 }
        );

    } catch(err) {
        return NextResponse.json({ error: "Someting went wrong.." }, { status: 500 });
    }
}