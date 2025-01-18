import app from './app';
import { config } from './config';
import { green } from 'colorette';
import { prisma } from './db/prisma';

const PORT = config.PORT || 3000;

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log(`✅ ${green('Successfully connected to database')}`);
    
    const server = app.listen(PORT, () => {
      console.log(`✅ ${green(`Server running on PORT: ${PORT}`)}`);
    });

    process.on('SIGTERM', async () => {
      console.log('🔄 SIGTERM received. Shutting down gracefully...');
      await prisma.$disconnect();
      server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });
    });

    process.on('unhandledRejection', (err: any) => {
      console.error('❌ UNHANDLED REJECTION! Shutting down...');
      console.error(err.name, err.message);
      server.close(() => process.exit(1));
    });

  } catch (error) {
    console.error('❌ Error starting application:', error);
    process.exit(1);
  }
};

startServer();