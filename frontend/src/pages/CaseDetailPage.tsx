import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { TaskTracker } from '../features/tasks/TaskTracker';
import { Edit, ArrowLeft, AlertCircle } from 'lucide-react';

export const CaseDetailPage = () => {
  const { id } = useParams();

  const { data: caseRecord, isLoading, isError } = useQuery({
    queryKey: ['case', id],
    queryFn: async () => {
      const { data } = await api.get(`/cases/${id}`);
      return data.data;
    }
  });

  if (isLoading) return <Skeleton className="h-64 w-full" />;

  if (isError || !caseRecord) {
    return (
      <div className="space-y-6">
        <Link to="/cases" className="inline-flex items-center text-sm text-blue-600 hover:underline">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Cases
        </Link>
        <Card>
          <CardContent className="p-12 flex flex-col items-center text-center gap-3">
            <AlertCircle className="h-10 w-10 text-red-400" />
            <h2 className="text-lg font-semibold text-gray-900">Case not found</h2>
            <p className="text-sm text-gray-500 max-w-sm">
              This case may have been deleted, or the link you followed is no longer valid.
            </p>
            <Link to="/cases">
              <Button variant="outline" className="mt-2">
                <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/cases" className="inline-flex items-center text-sm text-blue-600 hover:underline">
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to Cases
      </Link>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{caseRecord.caseTitle}</h2>
              <p className="text-gray-500">{caseRecord.caseType}</p>
            </div>
            <div className="flex gap-2">
              <Badge variant={caseRecord.stage as any}>{caseRecord.stage}</Badge>
              <Link to={`/cases/${id}/edit`}>
                <Button variant="outline" size="icon"><Edit className="h-4 w-4" /></Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div>
              <p className="text-gray-500">Client</p>
              <p className="font-semibold text-gray-900">{caseRecord.clientName}</p>
            </div>
            <div>
              <p className="text-gray-500">Court</p>
              <p className="font-semibold text-gray-900">{caseRecord.courtName}</p>
            </div>
            <div>
              <p className="text-gray-500">Next Hearing</p>
              <p className="font-semibold text-gray-900">{new Date(caseRecord.nextHearingDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-500">Created On</p>
              <p className="font-semibold text-gray-900">{new Date(caseRecord.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          {caseRecord.notes && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-gray-500 text-sm mb-1">Notes</p>
              <p className="text-gray-800">{caseRecord.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <TaskTracker caseId={id!} />
    </div>
  );
};
