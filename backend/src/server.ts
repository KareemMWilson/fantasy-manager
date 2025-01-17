import { PrismaClient } from '@prisma/client';
import app from './app';
import { config } from './config';
import { green } from 'colorette';

const PORT = config.PORT

const server = app.listen(PORT, () => {
  console.log(`✅ ${green(`Server running on PORT: ${PORT}`)}`);
});

// Database connection verification
const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log(`✅ ${green('Successfully connected to database')}`);
  } catch (error) {
    console.error('❌ Error connecting to database:', error);
    process.exit(1);
  }
};

connectDB();


process.on('unhandledRejection', (err: any) => {
  console.error('❌ UNHANDLED REJECTION! Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
}); 