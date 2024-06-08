import { NextRequest, NextResponse } from "next/server";
import Events, { IEvent } from "@/lib/models/Events";
import dbConnect from "@/lib/mongo";
import { parseEventFormData } from "@/lib/utils";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { CloudinaryResponse } from "@/lib/types";



export async function POST(req: NextRequest): Promise<NextResponse> {
    await dbConnect();
  
    try {
      const formData = await req.formData();
      const imageFile = formData.get("imageFile") as File;
  
      const formDataObject = parseEventFormData(formData) as IEvent;
  
      if (imageFile) {
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const results = await uploadImageToCloudinary(buffer, imageFile.name);
        formDataObject.imageUrl = (results as CloudinaryResponse).url;
      }
  
      const newEvent = new Events(formDataObject);
       
      const savedEvent = await newEvent.save();
      const createdEvent = savedEvent.toJSON();

      return NextResponse.json({
        message: "Event created successfully",
        createdEvent,
      }, { status: 201});
      
    } catch (err) {
      console.error("Error creating event:", err);
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }
  }
  

