
/** @type {import("next").NextConfig} */

const { i18n } = require('./next-i18next.config')

const nextConfig = {
  experimental: {
    useLightningcss: false,
    serverComponentsExternalPackages: ['next-intl'],
  },
};

module.exports = nextConfig
