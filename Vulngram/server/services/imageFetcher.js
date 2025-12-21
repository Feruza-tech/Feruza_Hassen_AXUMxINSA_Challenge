const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");
exports.fetchImage = async (imageUrl, userId) => {
  let parsed;
  try {
    parsed = new URL(imageUrl);
  } catch {
    throw new Error("Invalid URL");
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Invalid protocol");
  }

  const ALLOWED = [
  "images.unsplash.com",
  "upload.wikimedia.org",
  "rebind.attacker.lab"
];

console.log("HOSTNAME CHECKED:", parsed.hostname);

 // if (!ALLOWED.includes(parsed.hostname)) {
   // throw new Error("Domain not allowed");
  //}

  const response = await axios.get(imageUrl, {
    responseType: "arraybuffer",
    timeout: 5000,
    maxContentLength: 2 * 1024 * 1024,
  });

 // const ct = response.headers["content-type"] || "";
  //if (!ct.startsWith("image/")) {
   // throw new Error("Not an image");
  //}

  const uploads = path.join(__dirname, "../uploads");
  if (!fs.existsSync(uploads)) fs.mkdirSync(uploads);

  const filename = `avatar_${userId}.jpg`;
  fs.writeFileSync(path.join(uploads, filename), response.data);

  return filename;
};
