import styles from './[deviceNumber]/device.module.css';

export default function HomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>디바이스 등록 시스템</h1>
        <p className={styles.lead}>
          QR 코드를 스캔하여 디바이스 등록을 진행해주세요.
        </p>
      </div>
    </div>
  );
}
