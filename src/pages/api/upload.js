// pages/api/upload.js
import fs from "fs";
import path from "path";

const handler = nextConnect();

handler.post((req, res) => {
  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ message: "No image provided" });
  }

  // Extract the base64 string from the image data
  const base64Image = image.replace(/^data:image\/[a-zA-Z]+;base64,/, "");

  const filePath = path.join(
    process.cwd(),
    "public/uploads",
    `${Date.now()}.png`
  );

  // Write the base64 string to a file
  fs.writeFileSync(filePath, base64Image, "base64");

  // Respond with the base64 image URL
  res.status(200).json({
    imageUrl: `/uploads/${path.basename(filePath)}`,
  });
});

export default handler;
