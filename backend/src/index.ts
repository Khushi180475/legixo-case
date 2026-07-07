import app from './app';
import { env } from './config/env';
import { connectDB } from './config/db';
import { Case } from './models/Case.model';

const startServer = async () => {
  await connectDB();

  // Seed Dummy Data if Database is Empty
  const count = await Case.countDocuments();
  if (count === 0) {
    console.log('Database is empty. Seeding dummy data...');
    await Case.insertMany([
      {
        caseTitle: 'Sharma vs ABC Builders',
        clientName: 'Rohan Sharma',
        courtName: 'Delhi High Court',
        caseType: 'Civil Dispute',
        nextHearingDate: new Date('2026-07-25T00:00:00Z'),
        stage: 'Evidence',
        notes: 'Collect signed affidavits and submit property ownership documents before the hearing.'
      },
      {
        caseTitle: 'State vs Rajesh Kumar',
        clientName: 'Rajesh Kumar',
        courtName: 'District Court, Jaipur',
        caseType: 'Criminal',
        nextHearingDate: new Date('2026-07-18T00:00:00Z'),
        stage: 'Arguments',
        notes: 'Prepare final witness statements and review prosecution evidence.'
      },
      {
        caseTitle: 'Mehta Enterprises vs XYZ Logistics',
        clientName: 'Mehta Enterprises Pvt. Ltd.',
        courtName: 'Bombay High Court',
        caseType: 'Commercial',
        nextHearingDate: new Date('2026-08-05T00:00:00Z'),
        stage: 'Filing',
        notes: 'Verify contract copies and attach GST invoices.'
      },
      {
        caseTitle: 'Priya Singh Divorce Petition',
        clientName: 'Priya Singh',
        courtName: 'Family Court, Lucknow',
        caseType: 'Family',
        nextHearingDate: new Date('2026-07-30T00:00:00Z'),
        stage: 'Order Reserved',
        notes: 'Await final judgment. No additional documents required.'
      }
    ]);
    console.log('Dummy data seeded successfully!');
  }

  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
};

startServer();
