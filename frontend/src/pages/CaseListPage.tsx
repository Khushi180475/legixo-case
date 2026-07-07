import React, { useState } from 'react';
import { useCases, useDeleteCase } from '../hooks/useCases';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Skeleton } from '../components/ui/Skeleton';
import { Search, Plus, Trash2 } from 'lucide-react';
import { useRole } from '../context/RoleContext';

export const CaseListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const stage = searchParams.get('stage') || '';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';

  const { data: cases, isLoading } = useCases({ search, stage, startDate, endDate });
  const { role } = useRole();
  const deleteCase = useDeleteCase();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) searchParams.set('search', e.target.value);
    else searchParams.delete('search');
    setSearchParams(searchParams);
  };

  const handleStageFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) searchParams.set('stage', e.target.value);
    else searchParams.delete('stage');
    setSearchParams(searchParams);
  };

  const handleStartDateFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) searchParams.set('startDate', e.target.value);
    else searchParams.delete('startDate');
    setSearchParams(searchParams);
  };

  const handleEndDateFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) searchParams.set('endDate', e.target.value);
    else searchParams.delete('endDate');
    setSearchParams(searchParams);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Cases</h2>
          <p className="text-gray-500 mt-1">Manage intake records and track hearing dates.</p>
        </div>
        <Link to="/cases/new">
          <Button><Plus className="mr-2 h-4 w-4" /> New Case</Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search by title or client..." 
            className="pl-9" 
            value={search}
            onChange={handleSearch}
          />
        </div>
        <select
          value={stage}
          onChange={handleStageFilter}
          className="w-full sm:w-48 h-9 rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600"
        >
          <option value="">All Stages</option>
          <option value="Filing">Filing</option>
          <option value="Evidence">Evidence</option>
          <option value="Arguments">Arguments</option>
          <option value="Order Reserved">Order Reserved</option>
        </select>
        <div className="flex items-center gap-2">
          <label htmlFor="hearing-start-date" className="text-sm text-gray-500 whitespace-nowrap">Hearing from</label>
          <input
            id="hearing-start-date"
            type="date"
            value={startDate}
            onChange={handleStartDateFilter}
            max={endDate || undefined}
            className="h-9 rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600"
          />
          <label htmlFor="hearing-end-date" className="text-sm text-gray-500 whitespace-nowrap">to</label>
          <input
            id="hearing-end-date"
            type="date"
            value={endDate}
            onChange={handleEndDateFilter}
            min={startDate || undefined}
            className="h-9 rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600"
          />
        </div>
        {(search || stage || startDate || endDate) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchParams({})}
          >
            Clear filters
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-48 w-full rounded-xl" />)
        ) : cases?.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500">
            No cases found. Try adjusting your filters or create a new one.
          </div>
        ) : (
          cases?.map((c: any) => (
            <Card key={c._id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5 flex flex-col h-full">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg line-clamp-1">{c.caseTitle}</h3>
                  <Badge variant={c.stage as any}>{c.stage}</Badge>
                </div>
                
                <div className="text-sm text-gray-500 space-y-1 mb-4 flex-1">
                  <p><span className="font-medium text-gray-700">Client:</span> {c.clientName}</p>
                  <p><span className="font-medium text-gray-700">Court:</span> {c.courtName}</p>
                  <p><span className="font-medium text-gray-700">Next Hearing:</span> {new Date(c.nextHearingDate).toLocaleDateString()}</p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-auto">
                  <Link to={`/cases/${c._id}`}>
                    <Button variant="outline" size="sm">View Details</Button>
                  </Link>
                  <div className="flex gap-2">
                    {role === 'Admin' && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-red-500 hover:bg-red-50 hover:text-red-600"
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this case and all its tasks?")) {
                            deleteCase.mutate(c._id);
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
