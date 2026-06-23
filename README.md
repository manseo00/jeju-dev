# QR 디바이스 등록 웹페이지

QR 코드를 스캔하면 `/[deviceNumber]` 로 접속되어, 해당 디바이스 번호의
등록 여부에 따라 **등록 화면** 또는 **디바이스 정보 화면**을 보여주는 웹 애플리케이션입니다.

- QR URL 의 첫 번째 경로 값이 곧 디바이스 번호입니다. (예: `/A7K29P0XQ1`)
- 디바이스 번호는 서버에서 자동 생성하지 않으며, URL 파라미터에서 가져옵니다.
- 기존 `/device/[deviceNumber]` 주소로 접속하면 새 주소 `/[deviceNumber]` 로 자동 이동됩니다.

## 1. 기술 스택

- Next.js (App Router)
- TypeScript / React (TSX)
- CSS Modules (Tailwind 미사용)
- Prisma ORM
- Neon PostgreSQL
- Vercel 배포

> NestJS / EJS / JSON 파일 저장 / Tailwind / 사진 업로드는 사용하지 않습니다.

## 2. 환경변수 설정 방법

프로젝트 루트에 `.env` 파일을 만들고 `DATABASE_URL` 을 설정합니다.
(`.env.example` 을 복사해서 사용하세요. `.env` 는 git 에 커밋되지 않습니다.)

```bash
cp .env.example .env
```

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"
```

## 3. Neon PostgreSQL 생성 방법 (요약)

1. https://neon.tech 에 가입/로그인합니다.
2. **New Project** 를 만들고 PostgreSQL 데이터베이스를 생성합니다.
3. 프로젝트의 **Connection Details** 에서 Connection string 을 복사합니다.
4. Neon 은 SSL 이 필요하므로 연결 문자열 끝에 `?sslmode=require` 가 포함되어야 합니다.

### DATABASE_URL 예시

```env
DATABASE_URL="postgresql://neondb_owner:npg_xxxxxxxx@ep-cool-name-123456.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
```

## 4. Prisma 적용 (db push)

스키마를 데이터베이스에 반영합니다.

```bash
npx prisma generate   # Prisma Client 생성
npx prisma db push    # devices 테이블 생성/동기화
```

Prisma 모델은 `prisma/schema.prisma` 의 `Device` 모델을 기준으로 합니다.

## 5. 로컬 실행 방법

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

브라우저에서 다음 주소로 접속합니다.

```
http://localhost:3000/A7K29P0XQ1
```

### 동작

- **처음 접속**: 등록 화면이 표시됩니다. 디바이스 번호(`A7K29P0XQ1`)는 읽기 전용으로
  보이며, 입력 항목은 **어촌계명**, **등록자이름** 뿐입니다. (사진 항목 없음)
- **등록 후**: 디바이스 정보 화면으로 이동합니다.
  (어촌계명 / 디바이스 번호 / 등록자 이름 / 등록일자 표시)
- **같은 URL 재접속**: 등록 폼이 아니라 정보 화면이 표시됩니다.
- **다른 디바이스 번호** (예: `http://localhost:3000/B8K39P1XR2`): 새 등록 화면이 표시됩니다.
- **유효하지 않은 번호** (10자리 영대문자+숫자 규칙 위반): "유효하지 않은 디바이스 번호입니다." 안내 화면이 표시됩니다.

## 6. 디바이스 번호 규칙

- 총 10자리
- 영어 대문자(A-Z) + 숫자(0-9)
- 정규식: `/^[A-Z0-9]{10}$/`

## 7. 빌드

```bash
npm run build
```

`build` 스크립트는 `prisma generate && next build` 로 구성되어 있어,
Vercel 빌드 과정에서 Prisma Client 가 항상 생성됩니다.
(추가로 `postinstall` 에서도 `prisma generate` 가 실행됩니다.)

## 8. Vercel 배포 방법

1. 이 프로젝트를 GitHub 저장소에 push 합니다.
2. https://vercel.com 에서 **Add New → Project → Import** 로 해당 저장소를 가져옵니다.
3. Framework 는 Next.js 로 자동 인식됩니다.
4. 아래의 환경변수를 등록한 뒤 **Deploy** 합니다.

### Vercel 환경변수 등록 방법

- Vercel 프로젝트 → **Settings → Environment Variables**
- Key: `DATABASE_URL`
- Value: Neon 연결 문자열 (`...?sslmode=require` 포함)
- Environment: Production / Preview / Development 에 모두 적용
- 저장 후 재배포(Redeploy)

> `DATABASE_URL` 만 등록하면 동작합니다.

## 9. QR 주소 예시

QR 코드에는 다음과 같은 전체 URL 을 인코딩합니다.

```
https://<your-domain>.vercel.app/A7K29P0XQ1
```

`A7K29P0XQ1` 부분이 그대로 디바이스 번호가 됩니다.

## 10. iPhone Safari 테스트 주의사항

- `app/layout.tsx` 에 viewport(`viewportFit: cover`, `initialScale: 1`)를 설정했습니다.
- 모든 스타일은 CSS Modules 로 작성되어 외부 CSS 로딩 깨짐 문제가 없습니다.
- `input` 의 `font-size` 는 16px 이상이라 iOS 입력 시 자동 확대가 발생하지 않습니다.
- table 레이아웃 대신 div 기반 info-list 를 사용합니다.
- 카드 폭은 `width: 100%; max-width: 480px;` 이며 좌우 여백은 16px 입니다.
- 긴 디바이스 번호는 `overflow-wrap: anywhere` 로 줄바꿈됩니다.
- `globals.css` 에 `-webkit-text-size-adjust: 100%`, `box-sizing: border-box`,
  `overflow-x: hidden` 및 safe-area 패딩을 적용했습니다.

## 폴더 구조

```
app/
  layout.tsx
  page.tsx                   # 루트 안내 화면 (/)
  globals.css
  [deviceNumber]/            # /[deviceNumber]
    page.tsx                 # Server Component (등록 여부 조회)
    DeviceRegisterForm.tsx   # 등록 폼 (Client)
    DeviceInfoCard.tsx       # 정보 화면
    actions.ts               # 등록 Server Action
    device.module.css
  device/
    [deviceNumber]/
      page.tsx               # 레거시 호환: /device/[deviceNumber] -> /[deviceNumber] redirect
components/
  SiteHeader.tsx   # 상단 배너
  site-layout.module.css
lib/
  prisma.ts      # PrismaClient 싱글톤
  date.ts        # KST 날짜 처리
  validators.ts  # 디바이스 번호/입력값 검증
prisma/
  schema.prisma
.env.example
README.md
```
