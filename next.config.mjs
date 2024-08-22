/** @type {import('next').NextConfig} */
const nextConfig = {
  // 指定输出目录为 .next
  distDir: ".next",
  // 以下配置用于确保在本地开发环境中正确解析路径
  assetPrefix: "", // 设置为空字符串表示没有前缀
  // 以下配置用于确保在生产环境中正确解析路径
  // 如果你不打算部署到服务器，可以忽略这部分
  // assetPrefix: '/path/to/deployment', // 设置为部署路径的前缀
};

export default nextConfig;
