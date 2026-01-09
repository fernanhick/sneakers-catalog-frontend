import * as WebP from "react-native-webp-converter";
const convertImageToWebP = async (uri) => {
  if (!uri) return;
  console.log("Converting image:", uri);
  const inputImagePath = uri;
  const outputImagePath = inputImagePath.replace(/\.[^/.]+$/, ".webp");
  await WebP.convertImage(inputImagePath, outputImagePath, {
    quality: 80,
    type: WebP.Type.LOSSY,
  });
  return outputImagePath;
};

export default convertImageToWebP;
