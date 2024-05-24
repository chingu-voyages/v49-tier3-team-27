import mongoose, { Types, Schema } from "mongoose"

export interface IComment extends mongoose.Document {
    postID: Types.ObjectId;
    userID: Types.ObjectId;
    content: { text: string, imageURL: string };    
    engagement: { impressions: number, likes: number };
    isEdited: boolean;
    isReported: boolean;
    reported: { userID: Types.ObjectId, userMsg: string };
    isMuted: boolean;
    isReplyTo: Types.ObjectId;
}

const CommentSchema = new mongoose.Schema<IComment>({
    postID: {
        type: Schema.Types.ObjectId,
        ref: "posts",
        required: true,
    },
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
    },
    isReplyTo: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    }
},
    { timestamps: true }
)

export default mongoose.models.comments || mongoose.model("comments", CommentSchema);