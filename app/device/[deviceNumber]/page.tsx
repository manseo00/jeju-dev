import { redirect } from 'next/navigation';

type PageProps = {
  params: Promise<{ deviceNumber: string }>;
};

// 기존 /device/[deviceNumber] 주소 호환: 새 주소 /[deviceNumber] 로 자동 이동
export default async function LegacyDevicePage({ params }: PageProps) {
  const { deviceNumber } = await params;
  redirect(`/${deviceNumber}`);
}
