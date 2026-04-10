import app from './app.js';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { prisma } from './config/prisma.js';

const startServer = async (): Promise<void> => {
  try {
    // Verify database connection before accepting traffic
    await prisma.$connect();
    logger.info('✅ Database connected successfully');

    const server = app.listen(env.PORT, () => {
      logger.info(`🚀 EaseHire API [LIVE] http://localhost:${env.PORT} - Routes: Users, Jobs, Applications`);
    });

    // ─── Graceful Shutdown ────────────────────────────────────────────────────
    const shutdown = async (signal: string): Promise<void> => {
      logger.info(`🔴 ${signal} received. Starting graceful shutdown...`);
      server.close(async () => {
        await prisma.$disconnect();
        logger.info('✅ Database disconnected. Exiting.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    // Handle unhandled promise rejections — log and exit so process managers can restart
    process.on('unhandledRejection', (reason: any) => {
      logger.error('💥 Unhandled Promise Rejection:', reason);
      process.exit(1);
    });
  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

startServer();
