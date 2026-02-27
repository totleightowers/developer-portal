const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  sassOptions: {
    includePaths: [path.join(__dirname, 'node_modules')],
    quietDeps: true,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
