/** 场景配图（2026-10-16）：用于旧模板页面的纯文字模块。
 *  只放真实场景照片或真实界面截图，不放等距插画。
 *  wide：标题下整宽横幅；hero：首屏下方大图。 */
export default function Scene({ src, alt, variant = "wide", caption }: {
  src: string; alt: string; variant?: "wide" | "hero" | "half" | "ui"; caption?: string;
}) {
  return (
    <figure className={`scene scene--${variant}`}>
      <img src={src} alt={alt} loading={variant === "hero" ? "eager" : "lazy"} width={1800} height={1208} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
