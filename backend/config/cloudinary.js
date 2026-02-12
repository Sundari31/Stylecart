import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_dtrgkcjs2,
  api_key: process.env.CLOUDINARY_441789751764692,
  api_secret: process.env.CLOUDINARY_LgCwVhM3odcduroiSs6V5IWoKhA,
});

export default cloudinary;
