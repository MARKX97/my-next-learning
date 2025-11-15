/** @type {import('next').NextConfig} */
const repoName = 'my-next-learning';

const isProd =
  process.env.NODE_ENV === 'production' ||
  process.env.NEXT_PUBLIC_ENABLE_BASEPATH === '1';
const basePath = isProd ? `/${repoName}` : '';
const assetPrefix = isProd ? basePath : '';

const nextConfig = {
  output: 'export',
  distDir: '.next',
  basePath,
  assetPrefix,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
