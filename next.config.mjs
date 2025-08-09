/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "6500", // Specify the port for your backend
        pathname: "/static/images/**", // Be specific about the path if possible
      },
    ],
  },
};
export default nextConfig;
