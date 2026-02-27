'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/products', label: 'Products' },
  { href: '/guidelines', label: 'Guidelines' },
  { href: '/docs', label: 'Documentation' },
  { href: '/community', label: 'Community' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="app-header" role="banner">
      <div className="govuk-width-container app-header__container">
        <div>
          <Link href="/" className="app-header__title">
            <span className="app-header__org">Ministry of Magic</span>
            Developer Portal
          </Link>
        </div>
        <nav aria-label="Main navigation">
          <ul className="app-header__nav">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`app-header__nav-link${
                    pathname?.startsWith(item.href) ? ' app-header__nav-link--active' : ''
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
