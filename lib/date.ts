/**
 * 한국 시간(KST, UTC+9) 기준 오늘 날짜를 YYYY-MM-DD 형식 문자열로 반환합니다.
 */
export function getKstTodayString(date: Date = new Date()): string {
  // UTC 시간에 9시간을 더해 KST 기준 시각으로 환산한 뒤 날짜를 추출합니다.
  const kstMillis = date.getTime() + 9 * 60 * 60 * 1000;
  const kst = new Date(kstMillis);

  const year = kst.getUTCFullYear();
  const month = String(kst.getUTCMonth() + 1).padStart(2, '0');
  const day = String(kst.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * DB 에 저장된 DateTime(Date) 값을 화면 표시용 YYYY-MM-DD(KST 기준) 문자열로 변환합니다.
 */
export function formatDateToYmd(date: Date): string {
  return getKstTodayString(date);
}

/**
 * 등록일자 저장용 Date 객체를 생성합니다.
 * KST 기준 오늘 날짜의 자정(00:00:00 KST)에 해당하는 시각을 UTC Date 로 만듭니다.
 */
export function getKstTodayDate(date: Date = new Date()): Date {
  const ymd = getKstTodayString(date);
  // KST 자정은 UTC 기준 전날 15:00 이므로 명시적으로 -09:00 오프셋을 붙여 파싱합니다.
  return new Date(`${ymd}T00:00:00+09:00`);
}
