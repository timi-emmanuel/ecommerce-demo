import { v2 as cloudinary } from "cloudinary";

let isConfigured = false;

export function hasCloudinaryEnv() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
}

export function configureCloudinary() {
  if (!hasCloudinaryEnv()) {
    throw new Error(
      "Missing Cloudinary environment variables. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
    );
  }

  if (!isConfigured) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    isConfigured = true;
  }

  return cloudinary;
}

export async function uploadProductImage(
  file: string,
  publicId?: string,
) {
  const client = configureCloudinary();

  return client.uploader.upload(file, {
    folder: "ecommerce-starter/products",
    public_id: publicId,
    resource_type: "image",
  });
}
