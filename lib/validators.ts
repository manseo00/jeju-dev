/**
 * 디바이스 번호 검증.
 * 규칙: 영어 대문자(A-Z)와 숫자(0-9)로만 구성된 정확히 10자리.
 */
export function isValidDeviceNumber(deviceNumber: string): boolean {
  return /^[A-Z0-9]{10}$/.test(deviceNumber);
}

/**
 * 필수 텍스트 입력값 검증. trim 후 빈 값이면 false.
 */
export function isNonEmpty(value: string | null | undefined): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}
