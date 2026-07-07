import { getDashboardSummary } from '../services/dashboard.service';
import { toggleTaskStatus } from '../services/task.service';

export const root = {
  dashboardSummary: async () => {
    return await getDashboardSummary();
  },
  toggleTaskStatus: async ({ id, status }: { id: string, status: 'Pending' | 'Completed' }) => {
    return await toggleTaskStatus(id, status);
  }
};
