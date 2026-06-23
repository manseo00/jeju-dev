import styles from './site-layout.module.css';

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerText}>
        <span className={styles.footerLine}>
          <span className={styles.footerLabel}>담당 | </span>
          <span className={styles.footerName}>제주해양수산연구원</span>
        </span>
        <span className={styles.footerLine}>
          <span className={styles.footerLabel}>개발·제작 | </span>
          <span className={styles.footerName}>㈜코리아노바</span>
        </span>
      </p>
    </footer>
  );
}
