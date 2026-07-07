import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { env } from './env';

export const connectDB = async () => {
  try {
    let uri = env.MONGO_URI;

    // Use in-memory MongoDB for easy 0-config local dev if using default URI
    if (uri === 'mongodb://localhost:27017/legixo_case') {
      console.log('No external Mongo URI found. Starting in-memory MongoDB instance...');
      const mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};
