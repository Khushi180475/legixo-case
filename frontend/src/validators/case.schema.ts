import { z } from 'zod';

export const StageEnum = z.enum(['Filing', 'Evidence', 'Arguments', 'Order Reserved']);

export const createCaseSchema = z.object({
  caseTitle: z.string().min(3, "Case title must be at least 3 characters"),
  clientName: z.string().min(1, "Client name is required"),
  courtName: z.string().min(1, "Court name is required"),
  caseType: z.string().min(1, "Case type is required"),
  nextHearingDate: z.string().or(z.date()).refine(val => !isNaN(new Date(val).getTime()), "Invalid date"),
  stage: StageEnum,
  notes: z.string().max(500, "Notes cannot exceed 500 characters").optional().nullable(),
});

export const updateCaseSchema = createCaseSchema.partial();
