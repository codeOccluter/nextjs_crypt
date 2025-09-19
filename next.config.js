
/** @type {import("next").NextConfig} */

const { i18n } = require('./next-i18next.config')

const nextConfig = {
  experimental: {
    useLightningcss: false,
    serverComponentsExternalPackages: ['next-intl'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('typeorm');
    }
    return config;
  },
};

module.exports = nextConfig
