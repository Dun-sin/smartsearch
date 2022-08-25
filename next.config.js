/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	images: {
		domains: ['fdn2.gsmarena.com'],
	},
};

module.exports = nextConfig;
