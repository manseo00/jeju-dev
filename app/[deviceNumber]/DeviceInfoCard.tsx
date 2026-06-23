import styles from './device.module.css';

export default function DeviceInfoCard({
  fishingVillageName,
  deviceNumber,
  registrantName,
  registrationDate,
}: {
  fishingVillageName: string;
  deviceNumber: string;
  registrantName: string;
  registrationDate: string;
}) {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>디바이스 정보</h1>
          <span className={styles.badge}>등록 완료</span>
        </div>

        <div className={styles.infoList}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>어촌계명</span>
            <span className={styles.infoValue}>{fishingVillageName}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>디바이스 번호</span>
            <span className={`${styles.infoValue} ${styles.deviceValue}`}>
              {deviceNumber}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>등록자 이름</span>
            <span className={styles.infoValue}>{registrantName}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>등록일자</span>
            <span className={styles.infoValue}>{registrationDate}</span>
          </div>
        </div>

        <p className={styles.notice}>
          본 화면은 디바이스 등록 정보 조회 화면입니다.
        </p>
      </div>
    </div>
  );
}
