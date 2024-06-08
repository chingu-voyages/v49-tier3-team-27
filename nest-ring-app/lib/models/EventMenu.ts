import mongoose from "mongoose"

export interface IEventMenu extends mongoose.Document {
    name: string;
    slug: string;
    category: string;
    calories: number;
    imageUrl: string;
    description: string;
    rating: number;
    price: number;
    equivalence: string;    
}

const EventMenuSchema = new mongoose.Schema<IEventMenu>(
    {
        name: { type: String },
        slug: { type: String },
        category: { type: String },
        calories: { type: Number },
        imageUrl: { type: String },
        description: { type: String },
        rating: { type: Number },
        price: { type: Number },
        equivalence: { type: String }
    }, 
    { timestamps: true }
);

export default mongoose.models.eventMenu || mongoose.model("eventMenu", EventMenuSchema, "eventMenu")