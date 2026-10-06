import { Link } from "react-router-dom";
import { animations } from "../config/animationConfig";
import { assetPath } from "../utils/assetPath";

export default function ArtPage() {
  const pauseOtherVideos = (playingVideo: HTMLVideoElement) => {
    document.querySelectorAll<HTMLVideoElement>(".animation-card video").forEach((video) => {
      if (video !== playingVideo) video.pause();
    });
  };

  return (
    <main className="archive-page">
      <header className="archive-header">
        <Link className="archive-back" to="/art">← Return to the art room</Link>
        <nav className="archive-kicker" aria-label="Breadcrumb">
          <Link to="/">Chairmageddon</Link> / <Link to="/art">Art</Link> / <span aria-current="page">Animation</span>
        </nav>
        <div className="archive-header__title">
          <h1>Animation<br />archive</h1>
          <span>{String(animations.length).padStart(2, "0")} works<br />Motion archive</span>
        </div>
        <p className="archive-intro">
          Drawn moments, experiments, and moving stories. Select a study to play it.
        </p>
      </header>

      <section className="animation-grid" aria-label="Animation studies">
        {animations.map((animation) => (
          <article className="animation-card" key={animation.video}>
            <video
              aria-label={animation.title}
              controls
              playsInline
              preload="none"
              poster={assetPath(animation.poster)}
              onPlay={(event) => pauseOtherVideos(event.currentTarget)}
            >
              <source src={assetPath(animation.video)} type="video/mp4" />
              Your browser does not support MP4 playback.
            </video>
            <div className="animation-card__meta">
              <div>
                <span className="animation-card__index">No. {String(animation.id).padStart(2, "0")}</span>
                <h2>{animation.title}</h2>
              </div>
            </div>
          </article>
        ))}
      </section>
      <footer className="archive-footer">
        <span>End of archive</span>
        <Link to="/art">Return to the art room ↑</Link>
      </footer>
    </main>
  );
}
