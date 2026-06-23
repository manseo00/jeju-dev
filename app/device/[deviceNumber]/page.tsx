import { prisma } from '@/lib/prisma';
import { isValidDeviceNumber } from '@/lib/validators';
import { formatDateToYmd } from '@/lib/date';
import DeviceRegisterForm from './DeviceRegisterForm';
import DeviceInfoCard from './DeviceInfoCard';
import styles from './device.module.css';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ deviceNumber: string }>;
};

export default async function DevicePage({ params }: PageProps) {
  const { deviceNumber: raw } = await params;
  const deviceNumber = decodeURIComponent(raw);

  // 1) 디바이스 번호 형식 검증 — 유효하지 않으면 안내 화면
  if (!isValidDeviceNumber(deviceNumber)) {
    return (
      <main className={styles.page}>
        <div className={styles.card}>
          <h1 className={styles.title}>유효하지 않은 디바이스 번호입니다.</h1>
          <p className={styles.lead}>QR 코드를 다시 확인해주세요.</p>
          <div className={styles.readonlyBox}>{deviceNumber}</div>
        </div>
      </main>
    );
  }

  // 2) 등록 여부 조회
  const device = await prisma.device.findUnique({
    where: { deviceNumber },
  });

  // 3) 등록되어 있으면 정보 화면
  if (device) {
    return (
      <DeviceInfoCard
        fishingVillageName={device.fishingVillageName}
        deviceNumber={device.deviceNumber}
        registrantName={device.registrantName}
        registrationDate={formatDateToYmd(device.registrationDate)}
      />
    );
  }

  // 4) 등록되어 있지 않으면 등록 화면
  return <DeviceRegisterForm deviceNumber={deviceNumber} />;
}
