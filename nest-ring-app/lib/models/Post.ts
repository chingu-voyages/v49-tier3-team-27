import mongoose, { Types, Schema } from "mongoose"

export interface IPost extends mongoose.Document {
    userID: Types.ObjectId;
    content: { text: string, imageURL: string };
    postType: string;
    engagement: { impressions: number, likes: number };
    isEdited: boolean;
    isReported: boolean;
    reported: { userID: Types.ObjectId, userMsg: string };
    isMuted: boolean;
}

const PostSchema = new mongoose.Schema<IPost>({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    content: {
        text: {
            type: String,
        },
        imageURL: {
            type: String,
        },
    },
    postType: {
        type: String,
        default: "userPost",
        enum: ["ad", "userPost"]
    },
    engagement: {
        impressions: {
            type: Number
        }, 
        likes: {
            type: Number
        },
    },  
    isEdited: {
        type: Boolean,
    },
    isReported: {
        type: Boolean,
    },
    reported: { 
        userID: { 
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true,
        }, 
        userMsg: {
            type: String, 
        },
    },
    isMuted: {
        type: Boolean, 
    }
},
    { timestamps: true }
)

export default mongoose.models.posts || mongoose.model("posts", PostSchema);