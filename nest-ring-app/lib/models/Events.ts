import mongoose, { Schema, Types } from "mongoose";

export interface IEvent extends mongoose.Document {
  subject: string;
  description: string;
  category: string;
  creator: { userId: Types.ObjectId; imageUrl: string | null; name: string };
  location: string;
  imageUrl: string;
  eventDate: {
    fromDate: string;
    toDate: string;
    fromTime: string;
    toTime: string;
  };
  likeCount: number;
  monetization: { type: number | null; amount: number | null };
  invitedGuests: {
    userId: Types.ObjectId;
    imageUrl: string | null;
    name: string;
  }[];
  isOpenToAll: boolean;
  eventDishes: Types.ObjectId[];
}

const EventSchema = new mongoose.Schema<IEvent>(
  {
    subject: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    creator: {
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      imageUrl: { type: String, default: null },
      name: { type: String, required: true },
    },
    location: { type: String, required: true },
    imageUrl: { type: String },
    eventDate: {
      fromDate: { type: String, required: true },
      toDate: { type: String, required: true },
      fromTime: { type: String, required: true },
      toTime: { type: String, required: true },
    },
    likeCount: { type: Number, default: 0 },
    monetization: {
      type: { type: String, default: "off" },
      amount: { type: Number, default: null },
    },
    invitedGuests: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        imageUrl: { type: String, default: null },
        name: { type: String, required: true },
      },
    ],
    isOpenToAll: { type: Boolean, default: false },
    eventDishes: [{ type: Schema.Types.ObjectId, ref: "EventMenu" }],
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
