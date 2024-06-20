
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**.*",
            },
            {
                protocol: "http",
                hostname: "**.*",
            },
            {
                protocol: "https",
                hostname: "**",
                pathname: "/.image/**",
            },
            {
                protocol: "https",
                hostname: "**",
                pathname: "**/.*/**",
            }
        ],
    },
};

export default nextConfig;
