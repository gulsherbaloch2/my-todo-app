// src/components/task/task-list.tsx
import React from 'react';
import { Task } from '@/types';
import { TaskItem } from './task-item';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  emptyMessage?: string;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  loading, 
  onToggle, 
  onEdit, 
  onDelete, 
  emptyMessage = 'No tasks yet. Add your first task!' 
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </Card>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 italic">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export { TaskList };