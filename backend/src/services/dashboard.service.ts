import { Case } from '../models/Case.model';
import { Task } from '../models/Task.model';

export const getDashboardSummary = async () => {
  const now = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(now.getDate() + 7);

  // Executing all optimized db queries concurrently
  const [totalCases, upcomingHearings, tasksAggregation] = await Promise.all([
    Case.countDocuments(),
    Case.countDocuments({ nextHearingDate: { $gte: now, $lte: nextWeek } }),
    Task.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }])
  ]);

  let pendingTasks = 0;
  let completedTasks = 0;

  tasksAggregation.forEach(group => {
    if (group._id === 'Pending') pendingTasks = group.count;
    if (group._id === 'Completed') completedTasks = group.count;
  });

  return {
    totalCases,
    upcomingHearings,
    pendingTasks,
    completedTasks
  };
};
