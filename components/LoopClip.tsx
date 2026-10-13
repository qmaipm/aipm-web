// 愿景片截取的静音循环片段，当作板块插图使用（不带声音、不带控件）。
// 尊重 prefers-reduced-motion：CSS 中对该偏好隐藏视频、只显示封面图。
export default function LoopClip({
  src,
  poster,
  label,
  className = "",
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) {
  return (
    <figure className={`loopclip ${className}`}>
      <video src={src} poster={poster} autoPlay muted loop playsInline preload="metadata" aria-label={label} />
      <img className="loopclip__still" src={poster} alt={label} loading="lazy" />
    </figure>
  );
}
