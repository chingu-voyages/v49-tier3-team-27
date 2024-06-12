"use server";
import { v2 as cloudinary } from "cloudinary"
import { extractPublicId } from "cloudinary-build-url"

export const deleteImagesByUrl = async (prevState: string | undefined, formData: FormData) => {
    try {
        const imageUrl = formData.get("url") as string | null | undefined;
        const type = formData.get("type") as string | null | undefined
        if (imageUrl && type) {
            const deleteSuccess = await deleteCloudinaryImage(imageUrl);

            if (deleteSuccess) {
                return `${type} image deleted successfully`;
            } else {
                return `Failed to delete ${type} image`;
            }
        } else {
            return "Cannot delete empty image";
        }
    } catch (error) {
        console.error("Failed to delete an image: ", error);
        return "something went wrong"
    }
}

export const deleteCloudinaryImage = async(url: string) => {
    try {
        // config cloudinary
        cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        // extract resource id from url
        const resourceId = extractPublicId(url);
        // execute the destroy method of cloudinary
        const response = await cloudinary.uploader.destroy(resourceId, {
            invalidate: true,
            resource_type: "image",
        })
        console.log("cloudinary response to image destroy: ", response);
        // read confirmation from cloudinary
        if (response.result === "ok") {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error
    }
}