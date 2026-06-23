'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { registerDevice, type RegisterState } from './actions';
import styles from './device.module.css';

const initialState: RegisterState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.button} disabled={pending}>
      {pending ? '등록 중...' : '등록하기'}
    </button>
  );
}

export default function DeviceRegisterForm({
  deviceNumber,
}: {
  deviceNumber: string;
}) {
  const [state, formAction] = useActionState(registerDevice, initialState);

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>디바이스 등록</h1>

        <form action={formAction} className={styles.form}>
          {/* 디바이스 번호는 URL 값을 그대로 전송 (사용자 수정 불가) */}
          <input type="hidden" name="deviceNumber" value={deviceNumber} />

          <div className={styles.field}>
            <label className={styles.label}>디바이스</label>
            <div className={styles.readonlyBox}>{deviceNumber}</div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="fishingVillageName">
              어촌계명
            </label>
            <input
              id="fishingVillageName"
              name="fishingVillageName"
              type="text"
              className={styles.input}
              placeholder="어촌계명을 입력하세요"
              autoComplete="off"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="registrantName">
              등록자이름
            </label>
            <input
              id="registrantName"
              name="registrantName"
              type="text"
              className={styles.input}
              placeholder="등록자이름을 입력하세요"
              autoComplete="off"
              required
            />
          </div>

          {state.error ? (
            <p className={styles.error}>{state.error}</p>
          ) : null}

          <SubmitButton />
        </form>
      </div>
    </main>
  );
}
