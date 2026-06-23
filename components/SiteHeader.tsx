import styles from './site-layout.module.css';

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      {/* public/images/haenyeo-ax-header.png -> /images/haenyeo-ax-header.png */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.headerImage}
        src="/images/haenyeo-ax-header.png"
        alt="해녀 안전 AX 시스템"
      />
      <span className={styles.headerFade} aria-hidden="true" />
    </header>
  );
}
