import DynamicClient from './DynamicClient';

// 这里实现 generateStaticParams，返回需要静态导出的 id 列表
export async function generateStaticParams() {
  // 简单示例：预生成 id 1 和 2 的页面
  return [{ id: '1' }, { id: '2' }];
}

export default function Page({ params }: { params: { id: string } }) {
  return <DynamicClient id={params.id} />;
}
