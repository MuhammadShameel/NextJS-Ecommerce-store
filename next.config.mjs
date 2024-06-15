/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "explore-btk-opencommerce-apis.ceultnteo3kpk.ap-southeast-1.cs.amazonlightsail.com",
        port: "",
        pathname: "/assets/files/Media/**",
      },
    ],
  },
};

export default nextConfig;
