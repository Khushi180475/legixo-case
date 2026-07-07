import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { createCaseSchema } from '../validators/case.schema';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const CaseFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(createCaseSchema),
  });

  useEffect(() => {
    if (isEditing) {
      api.get(`/cases/${id}`).then(res => {
        const data = res.data.data;
        if (data.nextHearingDate) {
          data.nextHearingDate = new Date(data.nextHearingDate).toISOString().split('T')[0];
        }
        reset(data);
      });
    }
  }, [id, reset, isEditing]);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (isEditing) {
        return api.put(`/cases/${id}`, data);
      } else {
        return api.post('/cases', data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      navigate('/cases');
    }
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Case' : 'New Case Intake'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Case Title</label>
              <Input {...register('caseTitle')} error={errors.caseTitle?.message as string} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                <Input {...register('clientName')} error={errors.clientName?.message as string} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Court Name</label>
                <Input {...register('courtName')} error={errors.courtName?.message as string} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Case Type</label>
                <Input {...register('caseType')} error={errors.caseType?.message as string} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Next Hearing Date</label>
                <Input type="date" {...register('nextHearingDate')} error={errors.nextHearingDate?.message as string} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
              <select 
                {...register('stage')} 
                className={`w-full h-9 rounded-md border ${errors.stage ? 'border-red-500' : 'border-gray-300'} bg-transparent px-3 py-1 text-sm shadow-sm`}
              >
                <option value="">Select a stage</option>
                <option value="Filing">Filing</option>
                <option value="Evidence">Evidence</option>
                <option value="Arguments">Arguments</option>
                <option value="Order Reserved">Order Reserved</option>
              </select>
              {errors.stage && <p className="mt-1 text-xs text-red-500">{errors.stage.message as string}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
              <textarea 
                {...register('notes')} 
                className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                rows={3}
              />
              {errors.notes && <p className="mt-1 text-xs text-red-500">{errors.notes.message as string}</p>}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate('/cases')}>Cancel</Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Saving...' : 'Save Case'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
