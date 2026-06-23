// 注入 Schema.org 结构化数据(JSON-LD)。供 SEO / GEO 使用——让搜索引擎与 AI 生成引擎更易解析、引用。
// 服务端渲染,直接进 HTML;data 可为单个对象或数组。
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // 结构化数据为本站自有内容,非用户输入,序列化后注入安全。
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
