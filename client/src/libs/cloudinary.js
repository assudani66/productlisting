import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dqxv2shwt",
  api_key: import.meta.env.VITE_API_KEY,
  api_secret: import.meta.env.VITE_API_SECREAT,
});
