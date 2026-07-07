import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

(async () => {
  try {
    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    
    await mongoose.connect(uri);
    console.log('Connected');

    const CaseSchema = new mongoose.Schema({ title: String });
    const Case = mongoose.model('CaseTest', CaseSchema);

    await Case.create({ title: 'Test Case' });
    console.log('Created');

    const cases = await Case.find();
    console.log('Found:', cases.length);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
