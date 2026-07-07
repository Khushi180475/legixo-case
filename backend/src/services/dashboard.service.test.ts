import { getDashboardSummary } from './dashboard.service';
import { Case } from '../models/Case.model';
import { Task } from '../models/Task.model';

jest.mock('../models/Case.model');
jest.mock('../models/Task.model');

describe('Dashboard Service', () => {
  it('should aggregate metrics correctly', async () => {
    (Case.countDocuments as jest.Mock)
      .mockResolvedValueOnce(10) // Total cases
      .mockResolvedValueOnce(3); // Upcoming hearings

    (Task.aggregate as jest.Mock).mockResolvedValueOnce([
      { _id: 'Pending', count: 5 },
      { _id: 'Completed', count: 2 }
    ]);

    const result = await getDashboardSummary();

    expect(result.totalCases).toBe(10);
    expect(result.upcomingHearings).toBe(3);
    expect(result.pendingTasks).toBe(5);
    expect(result.completedTasks).toBe(2);
  });
});
