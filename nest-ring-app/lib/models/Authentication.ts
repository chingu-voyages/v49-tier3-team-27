import mongoose, { Types, Schema } from "mongoose"

export interface IAuthentication extends mongoose.Document {
    userRole: string;
    authenticationCode: string;
}

const AuthenticationSchema = new mongoose.Schema<IAuthentication>({
    userRole: {
        type: String,
        default: "customerSupport",
        enum: ["admin", "customerSupport"]
    },
    authenticationCode: {
        type: String,
    }
},
    { timestamps: true }
)

export default mongoose.models.authentications || mongoose.model("authentications", AuthenticationSchema);