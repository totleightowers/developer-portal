'use client';

import { useEffect, useRef, useState } from 'react';

interface SearchResult {
  url: string;
  title: string;
  excerpt: string;
}

export default function SearchWidget() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [pagefind, setPagefind] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadPagefind() {
      try {
        // Pagefind generates its JS in /pagefind/pagefind.js at build time
        const pf = await import(
          // @ts-expect-error — dynamic import of pagefind
          /* webpackIgnore: true */ '/pagefind/pagefind.js'
        );
        setPagefind(pf);
      } catch {
        // Pagefind not available (dev mode) — search will show a message
      }
    }
    loadPagefind();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      if (!pagefind) {
        setResults([]);
        return;
      }
      const search = await pagefind.search(query);
      const items: SearchResult[] = [];
      for (const r of search.results.slice(0, 8)) {
        const data = await r.data();
        items.push({
          url: data.url,
          title: data.meta?.title || 'Untitled',
          excerpt: data.excerpt,
        });
      }
      setResults(items);
    }, 200);
    return () => clearTimeout(timer);
  }, [query, pagefind]);

  return (
    <div className="portal-search-widget" ref={containerRef}>
      <div className="govuk-form-group">
        <input
          className="govuk-input"
          type="search"
          placeholder="Search documentation…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => query && setIsOpen(true)}
          aria-label="Search documentation"
        />
      </div>
      {isOpen && query.trim() && (
        <div className="portal-search-results">
          {!pagefind && (
            <p className="portal-search-hint">
              Search is available after building the site. Run <code>npm run build</code> first.
            </p>
          )}
          {pagefind && results.length === 0 && (
            <p className="portal-search-hint">No results found.</p>
          )}
          {results.map((r, i) => (
            <a key={i} href={r.url} className="portal-search-result">
              <strong>{r.title}</strong>
              <span dangerouslySetInnerHTML={{ __html: r.excerpt }} />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
