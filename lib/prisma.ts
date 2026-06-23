import { PrismaClient } from '@prisma/client';

// Vercel(서버리스) 환경에서 hot-reload / 함수 재실행 시 PrismaClient 인스턴스가
// 과도하게 생성되는 것을 막기 위해 globalThis 에 싱글톤으로 보관합니다.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
