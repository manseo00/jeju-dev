import styles from './site-layout.module.css';

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        {/* public/images/jeju-footer-logo.png -> /images/jeju-footer-logo.png */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.footerLogo}
          src="/images/jeju-footer-logo.png"
          alt="제주특별자치도"
        />
        <span className={styles.footerName}>해양수산연구원</span>
      </div>
    </footer>
  );
}
