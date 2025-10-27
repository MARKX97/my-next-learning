/** @type {import('next').NextConfig} */
const repoName = 'my-next-learning';

// 只有在 production 环境或显式启用时才启用 basePath/assetPrefix
const isProd =
  process.env.NODE_ENV === 'production' ||
  process.env.NEXT_PUBLIC_ENABLE_BASEPATH === '1';
const basePath = isProd ? `/${repoName}` : '';
const assetPrefix = isProd ? basePath : '';

const nextConfig = {
  // 使用静态导出
  output: 'export',
  // 保留默认的 .next 输出目录用于构建缓存
  distDir: '.next',
  // 当部署到 GitHub Pages 的仓库页面时，需要设置 basePath 和 assetPrefix
  basePath,
  assetPrefix,
  // 导出为静态页面时建议保留尾部斜杠，便于路由解析
  trailingSlash: true,
  // 禁用 Next.js 图片优化（与 output: 'export' 不兼容）
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
