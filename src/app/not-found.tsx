import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <main className={styles.page} role="main">
      <div className={styles.container}>
        <span className={styles.code} aria-hidden="true">
          404
        </span>
        <h1 className={styles.title}>Página no encontrada</h1>
        <p className={styles.description}>
          La página que buscás no existe o fue movida. Volvé al inicio para encontrar lo que
          necesitás.
        </p>
        <Link href="/" className={styles.cta} aria-label="Volver al inicio">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
