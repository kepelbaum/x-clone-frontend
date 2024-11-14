/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "media.giphy.com",
      "media0.giphy.com",
      "media1.giphy.com",
      "media2.giphy.com",
      "media3.giphy.com",
      "media4.giphy.com",
      "cdn.midjourney.com", //for default avatar
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
