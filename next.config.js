/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disable strict mode for faster compilation
  turbopack: {
    resolveAlias: {
      '@': './',
    },
  },
  webpack: (config, { isServer }) => {
    // Handle ArcGIS modules for webpack
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async',
    });

    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };

    return config;
  },
};

module.exports = nextConfig;
