import mongoose, { Schema, Types } from "mongoose";

export interface IEvent extends mongoose.Document {
    subject: string;
    description: string;
    category: string;
    creator: { userId: Types.ObjectId, imageUrl: string | null, name: string }; 
    location: number[]; 
    imageUrl: string;
    eventDate: Date;
    likeCount: number;
    monetization: { sponsor: number | null, fee: number | null };
    invitedGuests: {userId: Types.ObjectId, imageUrl: string | null, name: string}[];
    isOpentoAll: boolean;
    eventDishes: Types.ObjectId;
}

const EventSchema = new mongoose.Schema<IEvent>(
    {
        subject: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        creator:  {
            userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
            imageUrl: { type: String, default: null },
            name: { type: String, required: true },
        },
        location: { type: [Number], required: true },
        imageUrl: { type: String, required: true },
        eventDate: { type: Date, required: true },
        likeCount: { type: Number, default: 0 },
        monetization: {                         
            sponsor: { type: Number, default: null },
            fee: { type: Number, default: null },            
        },
        invitedGuests: [{
                userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
                imageUrl: { type: String, default: null },
                name: { type: String, required:  true }
            }]
        ,
        isOpentoAll: { type: Boolean, default: true },
        eventDishes: { type: Schema.Types.ObjectId, ref: 'EventMenu' }
    }, 
    { timestamps: true }
)

export default mongoose.models.Event || mongoose.model("Event", EventSchema)