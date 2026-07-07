import { Case, ICase } from '../models/Case.model';
import { Task } from '../models/Task.model';
import { ApiError } from '../utils/ApiError';

export const createCase = async (data: Partial<ICase>) => {
  return await Case.create(data);
};

export const getAllCases = async (query: any) => {
  const { search, stage, startDate, endDate } = query;
  
  const filter: any = {};
  
  if (search && search.trim() !== '') {
    const trimmed = search.trim();
    filter.$or = [
      { caseTitle: { $regex: trimmed, $options: 'i' } },
      { clientName: { $regex: trimmed, $options: 'i' } }
    ];
  }
  
  if (stage) {
    filter.stage = stage;
  }
  
  if (startDate || endDate) {
    filter.nextHearingDate = {};
    if (startDate) filter.nextHearingDate.$gte = new Date(startDate);
    if (endDate) filter.nextHearingDate.$lte = new Date(endDate);
  }

  return await Case.find(filter).sort({ createdAt: -1 });
};

export const getCaseById = async (id: string) => {
  const caseRecord = await Case.findById(id);
  if (!caseRecord) throw new ApiError(404, 'Case not found');
  return caseRecord;
};

export const updateCase = async (id: string, data: Partial<ICase>) => {
  const updated = await Case.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!updated) throw new ApiError(404, 'Case not found');
  return updated;
};

export const deleteCase = async (id: string) => {
  const deleted = await Case.findByIdAndDelete(id);
  if (!deleted) throw new ApiError(404, 'Case not found');
  
  // Cascade delete tasks
  await Task.deleteMany({ caseId: id });
  
  return deleted;
};
