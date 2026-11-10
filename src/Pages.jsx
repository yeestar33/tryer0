import { useState } from "react";
import { portfolio } from "./data/portfolio";
import { memes } from "./data/memes";

export function Portfolio() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="container portfolio-page">
      <section className="portfolio-intro">
        <div className="portrait">
          {portfolio.portrait && !failed ? (
            <img src={portfolio.portrait} alt={portfolio.portraitAlt || portfolio.name}
              onError={() => setFailed(true)} />
          ) : (
            <div className="portrait-placeholder">
              <span className="portrait-outline" aria-hidden="true" />
              <span>Your picture here</span>
            </div>
          )}
        </div>
        <div className="portfolio-heading">
          <p className="page-kicker">Portfolio</p>
          <h1>Hello,<br />I’m <em>{portfolio.name}.</em></h1>
          <p className="intro-line">{portfolio.introduction}</p>
          <a className="primary-link" href="#collection">View my collection <span aria-hidden="true">↗</span></a>
        </div>
      </section>
      <section className="biography" aria-labelledby="bio-title">
        <h2 id="bio-title">My story<span className="heading-dot">.</span></h2>
        <div>
          {portfolio.biography.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          <div className="interest-list">
            {portfolio.interests.map((interest, index) => <span key={index}>{interest}</span>)}
          </div>
        </div>
      </section>
      <div className="personal-notes">
        {portfolio.highlights.map((item, index) => (
          <section key={index}><h2>{item.title}</h2><p>{item.text}</p></section>
        ))}
      </div>
      {portfolio.links.length > 0 && (
        <section className="profile-links" aria-label="Find me online">
          {portfolio.links.filter((link) => /^(https?:\/\/|mailto:)/i.test(link.href)).map((link, index) => (
            <a key={index} href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>
          ))}
        </section>
      )}
    </div>
  );
}

function MemeTile({ item, playing }) {
  const [failed, setFailed] = useState(false);
  const [requested, setRequested] = useState(false);
  return (
    <figure className="meme-tile">
      <div className="meme-image">
        {failed ? (
          <a href={item.source} target="_blank" rel="noreferrer">View GIF on Tenor ↗</a>
        ) : playing || requested ? (
          <img className={`remix remix-${item.variant}`} src={item.src}
            alt={item.alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />
        ) : (
          <button className="play-meme" onClick={() => setRequested(true)} aria-label={`Play GIF ${item.id}`}>Play GIF <span aria-hidden="true">▷</span></button>
        )}
      </div>
      <figcaption><span className="item-number">{item.id}</span><span>{item.variant === 0 ? "Original" : `Remix ${item.variant}`}</span></figcaption>
    </figure>
  );
}

export function MemeWall() {
  const [playing, setPlaying] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  return (
    <div className="container meme-page">
      <div className="page-heading">
        <div><p className="page-kicker">The meme wall</p><h1>Angry Birds <em>kid.</em></h1>
          <p>One legendary stare. Fifty GIF tiles.</p></div>
        <button className="motion-toggle" aria-pressed={playing} onClick={() => setPlaying(!playing)}>
          {playing ? "Stop GIFs" : "Play all GIFs"}
        </button>
      </div>
      <div className="meme-grid">
        {memes.map((item) => <MemeTile key={`${item.id}-${playing}`} item={item} playing={playing} />)}
      </div>
      <p className="gif-credit">Original clip and creator credit on <a href={memes[0].source} target="_blank" rel="noreferrer">Tenor ↗</a>. This wall remixes the same clip.</p>
    </div>
  );
}
