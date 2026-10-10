"use client";
// 品牌愿景片《让智能，走进物理世界》（5:15，中英字幕）。
// 点击播放，不自动播放、不静音循环（片子有旁白、叙事性强）。
// 视频地址：优先取 NEXT_PUBLIC_VISION_FILM_URL（部署时指向 R2 / 对象存储），
// 未配置时回退到站内 /video/vision-film.mp4（仅预览用，正式环境请放到对象存储，不进代码库）。
import { useRef, useState } from "react";

export const VISION_FILM_SRC =
  process.env.NEXT_PUBLIC_VISION_FILM_URL || "/video/vision-film.mp4";
export const VISION_FILM_POSTER = "/master-plan/film-poster.webp";

export default function VisionFilm({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    setPlaying(true);
    requestAnimationFrame(() => ref.current?.play().catch(() => {}));
  };

  return (
    <div className={`vfilm ${playing ? "is-playing" : ""} ${className}`}>
      <video
        ref={ref}
        src={playing ? VISION_FILM_SRC : undefined}
        poster={VISION_FILM_POSTER}
        controls={playing}
        playsInline
        preload="none"
        aria-label="启盟科技品牌愿景片：让智能，走进物理世界"
      />
      {!playing && (
        <button type="button" className="vfilm__play" onClick={play} aria-label="播放愿景片">
          <span className="vfilm__btn" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="26" height="26"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
          </span>
          <span className="vfilm__meta">
            <b>观看愿景片</b>
            <em>5 分钟 · 中英字幕</em>
          </span>
        </button>
      )}
    </div>
  );
}
