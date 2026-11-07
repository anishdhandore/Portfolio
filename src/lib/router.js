// A tiny History-API router: the site has one home page and one case study
// page per project, so a dependency would be overkill.
import { useEffect, useState } from 'react';

const NAV_EVENT = 'app:navigate';
const CASE_STUDY = /^\/work\/([a-z0-9-]+)\/?$/;
const MAX_SCROLL_FRAMES = 30;

/** Slug of the case study at `pathname`, or null. */
export const matchCaseStudy = (pathname) => pathname.match(CASE_STUDY)?.[1] ?? null;

const scrollToHash = (hash) => {
  if (!hash) return false;
  const target = document.getElementById(hash.slice(1));
  if (!target) return false;
  // pinned, scroll-driven sections can ask to land at their end state
  if (target.dataset.scrollTo === 'end') {
    const top = target.getBoundingClientRect().top + window.scrollY;
    // 'instant': 'auto' would follow the page's CSS smooth scrolling
    window.scrollTo({ top: top + target.offsetHeight - window.innerHeight * 1.05, behavior: 'instant' });
    return true;
  }
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return true;
};

/**
 * Go to `href` without a page load. Same-page hashes just scroll; a path
 * change re-renders the app, then scrolls to the hash (or the top).
 */
export const navigate = (href) => {
  const url = new URL(href, window.location.href);
  const isSamePath = url.pathname === window.location.pathname;

  if (isSamePath && url.hash && scrollToHash(url.hash)) {
    window.history.replaceState(null, '', url.pathname + url.hash);
    return;
  }
  if (!isSamePath) {
    window.history.pushState(null, '', url.pathname + url.hash);
    window.dispatchEvent(new Event(NAV_EVENT));
  }
  // the new page may take a few frames to render; retry until the target exists
  if (!url.hash) {
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    return;
  }
  let framesLeft = MAX_SCROLL_FRAMES;
  const tryScroll = () => {
    if (scrollToHash(url.hash)) return;
    if (--framesLeft > 0) requestAnimationFrame(tryScroll);
  };
  window.scrollTo({ top: 0, behavior: 'instant' });
  requestAnimationFrame(tryScroll);
};

/** Current pathname, kept in sync with navigate() and browser back/forward. */
export const useRoute = () => {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const sync = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', sync);
    window.addEventListener(NAV_EVENT, sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener(NAV_EVENT, sync);
    };
  }, []);

  return { pathname };
};

/** Handle clicks on internal links (`/…`) client-side. */
export const useLinkInterception = () => {
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target instanceof Element ? e.target.closest('a[href]') : null;
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
      const href = link.getAttribute('href');
      if (!href.startsWith('/') || href.startsWith('//')) return;
      e.preventDefault();
      navigate(href);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
};
