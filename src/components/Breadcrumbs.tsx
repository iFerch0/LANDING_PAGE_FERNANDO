'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Inicio', href: '/' }];

    let currentPath = '';
    segments.forEach((segment) => {
      currentPath += `/${segment}`;

      // Convert URL segment to readable label
      const label = segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        label,
        href: currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on homepage
  if (pathname === '/') {
    return null;
  }

  return (
    <nav
      aria-label="breadcrumb"
      style={{
        padding: '16px 0',
        background: 'var(--color-background)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="container">
        <ol
          itemScope
          itemType="https://schema.org/BreadcrumbList"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            fontSize: '14px',
          }}
        >
          {breadcrumbs.map((breadcrumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;

            return (
              <li
                key={breadcrumb.href}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {!isLast ? (
                  <>
                    <Link
                      href={breadcrumb.href}
                      itemProp="item"
                      style={{
                        color: 'var(--color-primary)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                      onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
                    >
                      <span itemProp="name">{breadcrumb.label}</span>
                    </Link>
                    <meta itemProp="position" content={String(idx + 1)} />
                    <span
                      style={{
                        color: 'var(--color-text-secondary)',
                        userSelect: 'none',
                      }}
                      aria-hidden="true"
                    >
                      /
                    </span>
                  </>
                ) : (
                  <>
                    <span
                      itemProp="name"
                      style={{
                        color: 'var(--color-text)',
                        fontWeight: '500',
                      }}
                      aria-current="page"
                    >
                      {breadcrumb.label}
                    </span>
                    <meta itemProp="position" content={String(idx + 1)} />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
