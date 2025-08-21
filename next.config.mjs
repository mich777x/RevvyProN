/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// example options:
	images: {
		remotePatterns: [
			// { protocol: 'https', hostname: 'images.example.com' }
		],
	},
	experimental: {
		// typedRoutes: true,
		// optimizePackageImports: ['lucide-react'],
	},
};

export default nextConfig;
