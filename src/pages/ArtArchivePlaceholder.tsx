import { Link } from "react-router-dom";

type ArtArchivePlaceholderProps = {
  title: string;
  label?: string;
  parentPath?: string;
  parentLabel?: string;
};

export default function ArtArchivePlaceholder({ title, label = title, parentPath = "/art", parentLabel }: ArtArchivePlaceholderProps) {
  const returnLabel = parentLabel ? `Return to the ${parentLabel.toLowerCase()} scene` : "Return to the art room";

  return (
    <main className="archive-page">
      <header className="archive-header">
        <Link className="archive-back" to={parentPath}>← {returnLabel}</Link>
        <nav className="archive-kicker" aria-label="Breadcrumb">
          <Link to="/">Chairmageddon</Link> / <Link to="/art">Art</Link> / {parentLabel && <><Link to={parentPath}>{parentLabel}</Link> / </>}<span aria-current="page">{label}</span>
        </nav>
        <div className="archive-header__title">
          <h1>{title}<br />archive</h1>
        </div>
        <p className="archive-intro">This archive is being assembled.</p>
      </header>
      <footer className="archive-footer">
        <span>{title}</span>
        <Link to={parentPath}>{returnLabel} ↑</Link>
      </footer>
    </main>
  );
}
