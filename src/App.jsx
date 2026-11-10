import { useEffect, useRef, useState } from "react";
import { gallery } from "./data/gallery";
import { Portfolio, MemeWall } from "./Pages";
import { portfolio } from "./data/portfolio";
import "./index.css";

function GalleryImage({ item, onOpen }) {
  const [failed, setFailed] = useState(false);
  const hasImage = item.src && !failed;
  const content = hasImage ? (
    <img
      src={item.src}
      alt={item.alt || item.caption || `Gallery image ${item.id}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  ) : (
    <span className="placeholder-number" aria-hidden="true">{item.id}</span>
  );

  return (
    <figure className="gallery-item">
      {hasImage ? (
        <button className="gallery-frame filled" onClick={() => onOpen(item)}
          aria-label={`Enlarge ${item.caption || `image ${item.id}`}`}>
          {content}
          <span className="enlarge" aria-hidden="true">↗</span>
        </button>
      ) : (
        <div className="gallery-frame placeholder" role="img"
          aria-label={`Empty gallery space ${item.id}${failed ? ". Image unavailable" : ""}`}>
          {content}
        </div>
      )}
      <figcaption>
        <span className="item-number">{item.id}</span>
        {item.caption && <span>{item.caption}</span>}
        {failed && <span className="image-error">Image unavailable</span>}
      </figcaption>
    </figure>
  );
}

function ImageViewer({ item, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    closeRef.current.focus();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      previousFocus?.focus();
    };
  }, []);

  function closeOnBackdrop(event) {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom) onClose();
  }

  return (
    <dialog ref={dialogRef} className="image-viewer"
      aria-label={item.caption || `Gallery image ${item.id}`}
      onClick={closeOnBackdrop}
      onCancel={(event) => { event.preventDefault(); onClose(); }}>
      <button ref={closeRef} className="close-button" onClick={onClose} aria-label="Close image">×</button>
      <img src={item.src} alt={item.alt || item.caption || `Gallery image ${item.id}`} />
      <div className="viewer-caption">
        <span className="item-number">{item.id}</span>
        {item.caption && <span>{item.caption}</span>}
      </div>
    </dialog>
  );
}


const pages = [
  { id: "portfolio", label: "Portfolio" },
  { id: "collection", label: "Collection" },
  { id: "angry-birds", label: "Angry Birds" },
];

function pageFromHash() {
  const hash = window.location.hash.slice(1);
  return pages.some((page) => page.id === hash) ? hash : "portfolio";
}

export default function App() {
  const [selected, setSelected] = useState(null);
  const [activePage, setActivePage] = useState(pageFromHash);
  const [motionDisabled, setMotionDisabled] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const titleRef = useRef(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    function changePage() {
      setSelected(null);
      setActivePage(pageFromHash());
      window.scrollTo({ top: 0, behavior: "instant" });
      titleRef.current?.focus({ preventScroll: true });
    }
    function updateMotion() {
      setMotionDisabled(media.matches);
    }
    media.addEventListener("change", updateMotion);
    window.addEventListener("hashchange", changePage);
    return () => {
      window.removeEventListener("hashchange", changePage);
      media.removeEventListener("change", updateMotion);
    };
  }, []);

  useEffect(() => {
    document.title = `${pages.find((page) => page.id === activePage).label} — ${portfolio.name}`;
  }, [activePage]);

  return (
    <>
      <a className="skip-link" href="#page-content" onClick={(event) => {
        event.preventDefault();
        titleRef.current?.focus();
      }}>Skip to content</a>
      <header className="site-header">
        <div className="container navigation">
          <a className="brand" href="#portfolio">{portfolio.name}<span className="brand-dot" aria-hidden="true">.</span></a>
          <nav className="page-tabs" aria-label="Main navigation">
            {pages.map((page) => (
              <a key={page.id} href={`#${page.id}`}
                aria-current={activePage === page.id ? "page" : undefined}>
                {page.label}<span className="tab-wave" aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>
      </header>
      <main ref={titleRef} id="page-content" tabIndex={-1}
        aria-label={pages.find((page) => page.id === activePage).label}
        className="page-main">
        {activePage === "portfolio" && <Portfolio />}
        {activePage === "collection" && (
          <section className="collection collection-page container" aria-labelledby="gallery-title">
            <div className="page-heading">
              <div><p className="page-kicker">A personal gallery</p>
                <h1 id="gallery-title">The <em>collection.</em></h1></div>
              <span className="collection-count">{String(gallery.length).padStart(2, "0")} spaces</span>
            </div>
            <div className="gallery-grid">
              {gallery.map((item) => <GalleryImage key={item.id} item={item} onOpen={setSelected} />)}
            </div>
          </section>
        )}
        {activePage === "angry-birds" && <MemeWall />}
      </main>
      <footer className="container">
        <span>{portfolio.name} © {new Date().getFullYear()}</span>
        <button className="back-to-top" onClick={() => window.scrollTo({
          top: 0, behavior: motionDisabled ? "instant" : "smooth",
        })}>Back to top ↑</button>
      </footer>
      {selected && <ImageViewer item={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
