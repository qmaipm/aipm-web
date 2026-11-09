"use client";
// 品牌愿景片《让智能，走进物理世界》（5:15，中英字幕）。
// 点击播放，不自动播放、不静音循环（片子有旁白、叙事性强）。
// 视频地址：优先取 NEXT_PUBLIC_VISION_FILM_URL；未配置时用阿里云 OSS 上的 720p 网页压制版
// （v5.3，H.264+AAC，faststart，约 33MB）。视频不进仓库——Gitea 前置 nginx 限制单次推送体积。
// 原片：stalliance_vision_v5_3_1080p_master.mp4（1080p 母版，不进仓库）。
import { useRef, useState } from "react";

const VISION_FILM_OSS_URL =
  "https://qm-web-static.oss-cn-hangzhou.aliyuncs.com/public/vision-film.mp4";

export const VISION_FILM_SRC =
  process.env.NEXT_PUBLIC_VISION_FILM_URL || VISION_FILM_OSS_URL;
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
