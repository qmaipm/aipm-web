// 客户 Logo 墙：8 家真实客户，4-4 两行布局，灰度呈现、悬停彩色。
// 有 logo 文件的用图片；暂缺 logo 文件的(佳都/wework/雅生活)先用文字 logo 兜底，
// 待补齐 public/images/clients/ 下对应 SVG 后替换。
type Client = { name: string; img?: string; big?: boolean };

const CLIENTS: Client[] = [
  { name: '特斯拉', img: '/images/clients/tesla.svg' },
  { name: '西门子医疗', img: '/images/clients/siemens.svg' },
  { name: '腾讯', img: '/images/clients/tencent.svg', big: true },
  { name: '字节跳动', img: '/images/clients/bytedance.svg' },
  { name: '顺丰', img: '/images/clients/sf.svg' },
  { name: 'PCI 佳都科技', img: '/images/PCI_logo.png', big: true },
  { name: 'wework', img: '/images/clients/wework.svg' },
  { name: '雅生活', img: '/images/ALIVING_logo.png', big: true },
];

export default function Clients() {
  return (
    <section className="clients clients-stripe">
      <div className="clients-container">
        <div className="clients-grid-stripe">
          {CLIENTS.map((c) => (
            <div key={c.name} className={`client-logo-stripe${c.big ? ' is-lg' : ''}`}>
              {c.img ? (
                <img src={c.img} alt={c.name} className="client-logo-img-stripe" />
              ) : (
                <span className="client-logo-text-stripe">{c.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
