import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    const uploadResult = await cloudinary.uploader
      .upload(localFilePath, {
        resource_type: "auto",
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("file uploaded succesfully", uploadResult.url);

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url({
      fetch_format: "auto",
      quality: "auto",
    });

    console.log(optimizeUrl);

    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url({
      crop: "auto",
      gravity: "auto",
      width: 500,
      height: 500,
    });

    console.log(autoCropUrl);
  } catch (error) {
    fs.accessSync(localFilePath);
  }
};

export { uploadOnCloudinary };
