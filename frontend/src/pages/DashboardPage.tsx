import React from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { Card, CardContent } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import { Briefcase, Calendar, Clock, CheckCircle } from 'lucide-react';

export const DashboardPage = () => {
  const { data, isLoading, isError } = useDashboard();

  if (isError) return <div className="text-red-500">Failed to load dashboard.</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h2>
        <p className="text-gray-500 mt-1">Overview of your case intake and hearing readiness.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 w-full rounded-xl" />)
        ) : (
          <>
            <SummaryCard 
              title="Total Active Cases" 
              value={data?.totalCases} 
              icon={Briefcase} 
              color="text-blue-600" 
              bg="bg-blue-100" 
            />
            <SummaryCard 
              title="Hearings (Next 7 Days)" 
              value={data?.upcomingHearings} 
              icon={Calendar} 
              color="text-orange-600" 
              bg="bg-orange-100" 
            />
            <SummaryCard 
              title="Pending Tasks" 
              value={data?.pendingTasks} 
              icon={Clock} 
              color="text-yellow-600" 
              bg="bg-yellow-100" 
            />
            <SummaryCard 
              title="Completed Tasks" 
              value={data?.completedTasks} 
              icon={CheckCircle} 
              color="text-green-600" 
              bg="bg-green-100" 
            />
          </>
        )}
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value, icon: Icon, color, bg }: any) => (
  <Card>
    <CardContent className="p-6 flex items-center space-x-4">
      <div className={`p-3 rounded-full ${bg}`}>
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value || 0}</h3>
      </div>
    </CardContent>
  </Card>
);
