import Link from 'next/link';
import styles from './Pagination.module.css';

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  searchParams: Record<string, string | string[] | undefined>;
}

function buildPageUrl(
  targetPage: number,
  searchParams: Record<string, string | string[] | undefined>
): string {
  const params = new URLSearchParams();
  for (const [key, val] of Object.entries(searchParams)) {
    if (key !== 'page' && typeof val === 'string') params.set(key, val);
  }
  if (targetPage > 1) params.set('page', String(targetPage));
  const qs = params.toString();
  return qs ? `/tienda?${qs}` : '/tienda';
}

function getVisiblePages(page: number, totalPages: number): (number | '...')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | '...')[] = [1];

  if (page > 3) pages.push('...');

  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (page < totalPages - 2) pages.push('...');

  pages.push(totalPages);
  return pages;
}

export function Pagination({ page, pageSize, total, searchParams }: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) return null;

  const isFirst = page <= 1;
  const isLast = page >= totalPages;
  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <nav className={styles.nav} aria-label="Paginación">
      <div className={styles.controls}>
        {isFirst ? (
          <span className={`${styles.btn} ${styles.disabled}`} aria-disabled="true">
            ← Anterior
          </span>
        ) : (
          <Link href={buildPageUrl(page - 1, searchParams)} className={styles.btn} scroll={true}>
            ← Anterior
          </Link>
        )}

        <ol className={styles.pages}>
          {visiblePages.map((p, i) =>
            p === '...' ? (
              <li key={`ellipsis-${i}`} className={styles.ellipsis} aria-hidden="true">
                …
              </li>
            ) : (
              <li key={p}>
                <Link
                  href={buildPageUrl(p, searchParams)}
                  className={`${styles.pageBtn} ${p === page ? styles.active : ''}`}
                  aria-current={p === page ? 'page' : undefined}
                  scroll={true}
                >
                  {p}
                </Link>
              </li>
            )
          )}
        </ol>

        {isLast ? (
          <span className={`${styles.btn} ${styles.disabled}`} aria-disabled="true">
            Siguiente →
          </span>
        ) : (
          <Link href={buildPageUrl(page + 1, searchParams)} className={styles.btn} scroll={true}>
            Siguiente →
          </Link>
        )}
      </div>

      <p className={styles.info}>
        Página {page} de {totalPages}
      </p>
    </nav>
  );
}
