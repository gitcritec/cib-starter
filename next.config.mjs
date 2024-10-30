/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    env: {
        BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.critecws.com',
            }
        ]
    },
};

export default nextConfig;
