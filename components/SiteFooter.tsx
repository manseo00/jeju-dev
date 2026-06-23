import styles from './site-layout.module.css';

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        {/* public/images/jeju-logo.png -> /images/jeju-logo.png */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.footerLogo}
          src="/images/jeju-logo.png"
          alt="제주특별자치도"
        />
        <span className={styles.footerTextGroup}>
          <span className={styles.footerName}>해양수산연구원</span>
          <span className={styles.footerSub}>
            Jeju Fisheries and Marine Research Institute
          </span>
        </span>
      </div>
    </footer>
  );
}
