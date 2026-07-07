import { z } from 'zod';

export const PriorityEnum = z.enum(['Low', 'Medium', 'High']);
export const StatusEnum = z.enum(['Pending', 'Completed']);

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  dueDate: z.string().or(z.date()).refine(val => !isNaN(new Date(val).getTime()), "Invalid date"),
  ownerName: z.string().min(1, "Owner name is required"),
  priority: PriorityEnum.default('Medium'),
  status: StatusEnum.default('Pending'),
});

export const updateTaskSchema = createTaskSchema.partial();
