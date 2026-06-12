// 客户 Logo 墙：8 家真实客户，4-4 两行布局。
// 无 logo 图片资源时用站内字体的克制文字 logo，灰度呈现、悬停加深。
const CLIENTS = [
  '特斯拉',
  '西门子医疗',
  '腾讯',
  '字节跳动',
  '顺丰',
  'PCI 佳都科技',
  'wework',
  '雅生活',
];

export default function Clients() {
  return (
    <section className="clients clients-stripe">
      <div className="clients-container">
        <div className="clients-grid-stripe">
          {CLIENTS.map((name) => (
            <div key={name} className="client-logo-stripe">
              <span className="client-logo-text-stripe">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
