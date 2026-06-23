'use server';

import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getKstTodayDate } from '@/lib/date';
import { isValidDeviceNumber, isNonEmpty } from '@/lib/validators';

export type RegisterState = {
  error?: string;
};

/**
 * 디바이스 등록 Server Action.
 * - deviceNumber 는 URL(폼 hidden)에서 받은 값을 사용한다.
 * - 어촌계명/등록자이름은 필수값이다.
 * - 등록일자는 서버에서 KST 기준 오늘 날짜로 자동 저장한다.
 * - 이미 등록된 deviceNumber 이면 중복 insert 하지 않고 정보 화면으로 이동한다.
 */
export async function registerDevice(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const deviceNumber = String(formData.get('deviceNumber') ?? '').trim();
  const fishingVillageName = String(
    formData.get('fishingVillageName') ?? '',
  ).trim();
  const registrantName = String(formData.get('registrantName') ?? '').trim();

  // 디바이스 번호 검증 (서버 측)
  if (!isValidDeviceNumber(deviceNumber)) {
    return { error: '유효하지 않은 디바이스 번호입니다.' };
  }

  // 필수값 검증
  if (!isNonEmpty(fishingVillageName)) {
    return { error: '어촌계명을 입력해주세요.' };
  }
  if (!isNonEmpty(registrantName)) {
    return { error: '등록자이름을 입력해주세요.' };
  }

  // 중복 등록 방지: 이미 존재하면 덮어쓰지 않고 정보 화면으로 이동
  const existing = await prisma.device.findUnique({
    where: { deviceNumber },
  });

  if (existing) {
    redirect(`/${deviceNumber}`);
  }

  try {
    await prisma.device.create({
      data: {
        deviceNumber,
        fishingVillageName,
        registrantName,
        registrationDate: getKstTodayDate(),
      },
    });
  } catch (err) {
    // unique 제약 충돌(동시 등록 등) 등은 중복으로 간주하고 정보 화면으로 이동
    const code = (err as { code?: string }).code;
    if (code === 'P2002') {
      redirect(`/${deviceNumber}`);
    }
    return { error: '등록 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' };
  }

  // 등록 완료 후 정보 화면으로 이동
  redirect(`/${deviceNumber}`);
}
