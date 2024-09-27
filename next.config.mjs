/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    env: {
        BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
        BACKEND_COMPANY_FILES: process.env.NEXT_COMPANY_FILES,
    },
    images: {
        domains: ['www.critecws.com'],  // Adicione outros domínios conforme necessário
    },
};

export default nextConfig;
