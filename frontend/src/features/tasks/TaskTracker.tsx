import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { CheckCircle, Circle, Plus, Trash2 } from 'lucide-react';
import { gqlClient } from '../../services/graphql';

const TOGGLE_TASK_MUTATION = `
  mutation ToggleTaskStatus($id: String!, $status: String!) {
    toggleTaskStatus(id: $id, status: $status) {
      _id
      status
    }
  }
`;

export const TaskTracker = ({ caseId }: { caseId: string }) => {
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', dueDate: '', ownerName: '', priority: 'Medium' });

  const { data: tasks } = useQuery({
    queryKey: ['tasks', caseId],
    queryFn: async () => {
      const { data } = await api.get(`/cases/${caseId}/tasks`);
      return data.data;
    }
  });

  const createMutation = useMutation({
    mutationFn: async (task: any) => api.post(`/cases/${caseId}/tasks`, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', caseId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      setIsCreating(false);
      setNewTask({ title: '', dueDate: '', ownerName: '', priority: 'Medium' });
    }
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      return gqlClient.request(TOGGLE_TASK_MUTATION, { id, status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', caseId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => api.delete(`/tasks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', caseId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    }
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Hearing Tasks</CardTitle>
        <Button size="sm" onClick={() => setIsCreating(!isCreating)}>
          <Plus className="mr-1 h-4 w-4" /> Add Task
        </Button>
      </CardHeader>
      <CardContent>
        {isCreating && (
          <div className="mb-6 p-4 border border-blue-100 bg-blue-50 rounded-lg space-y-3">
            <input
              type="text" placeholder="Task Title" className="w-full h-9 px-3 rounded-md border border-gray-300"
              value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})}
            />
            <div className="grid grid-cols-3 gap-3">
              <input
                type="date" className="h-9 px-3 rounded-md border border-gray-300"
                value={newTask.dueDate} onChange={e => setNewTask({...newTask, dueDate: e.target.value})}
              />
              <input
                type="text" placeholder="Owner" className="h-9 px-3 rounded-md border border-gray-300"
                value={newTask.ownerName} onChange={e => setNewTask({...newTask, ownerName: e.target.value})}
              />
              <select
                className="h-9 px-3 rounded-md border border-gray-300"
                value={newTask.priority} onChange={e => setNewTask({...newTask, priority: e.target.value})}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
              <Button size="sm" onClick={() => createMutation.mutate(newTask)}>Save</Button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {tasks?.map((task: any) => (
            <div key={task._id} className={`flex items-center justify-between p-3 border rounded-lg ${task.status === 'Completed' ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleMutation.mutate({ id: task._id, status: task.status === 'Completed' ? 'Pending' : 'Completed' })}
                  className="text-gray-400 hover:text-blue-600 focus:outline-none"
                >
                  {task.status === 'Completed' ? <CheckCircle className="h-6 w-6 text-green-500" /> : <Circle className="h-6 w-6" />}
                </button>
                <div>
                  <p className={`font-medium ${task.status === 'Completed' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{task.title}</p>
                  <p className="text-xs text-gray-500">
                    Due: {new Date(task.dueDate).toLocaleDateString()} • Owner: {task.ownerName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={task.priority}>{task.priority}</Badge>
                <button
                  onClick={() => deleteMutation.mutate(task._id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {tasks?.length === 0 && !isCreating && (
            <p className="text-gray-500 text-center py-4 text-sm">No tasks added yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
