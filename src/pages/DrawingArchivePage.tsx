import { Link } from "react-router-dom";
import { drawingsInFolder } from "../config/drawingGallery";
import { assetPath } from "../utils/assetPath";

type DrawingArchivePageProps = {
  title: string;
  folder: string;
};

export default function DrawingArchivePage({ title, folder }: DrawingArchivePageProps) {
  const works = drawingsInFolder(folder);

  return (
    <main className="archive-page drawing-archive">
      <header className="archive-header">
        <Link className="archive-back" to="/art/drawing">← Return to the drawing scene</Link>
        <nav className="archive-kicker" aria-label="Breadcrumb">
          <Link to="/">Chairmageddon</Link> / <Link to="/art">Art</Link> / <Link to="/art/drawing">Drawing</Link> / <span aria-current="page">{title}</span>
        </nav>
        <div className="archive-header__title">
          <h1>{title}<br />archive</h1>
          <span>{String(works.length).padStart(2, "0")} works<br />Drawing archive</span>
        </div>
        <p className="archive-intro">Select a drawing to view the full image.</p>
      </header>

      <section className="drawing-grid" aria-label={`${title} drawings`}>
        {works.map((work, index) => (
          <figure className="drawing-card" key={work.fileName}>
            <a href={assetPath(work.src)} target="_blank" rel="noreferrer" aria-label={`View ${work.fileName} full size`}>
              <img src={assetPath(work.src)} alt={`${title} drawing: ${work.fileName}`} loading={index < 3 ? "eager" : "lazy"} decoding="async" />
            </a>
            <figcaption>
              <span>No. {String(index + 1).padStart(2, "0")}</span>
              <span>{work.fileName.replace(/\.[^.]+$/, "")}</span>
            </figcaption>
          </figure>
        ))}
      </section>

      <footer className="archive-footer">
        <span>End of archive</span>
        <Link to="/art/drawing">Return to the drawing scene ↑</Link>
      </footer>
    </main>
  );
}
