/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['fdn2.gsmarena.com'],
	},
};

module.exports = nextConfig;
