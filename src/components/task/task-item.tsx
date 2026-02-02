// src/components/task/task-item.tsx
import React, { useState } from 'react';
import { Task } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    // Allow animation to complete before calling onDelete
    setTimeout(() => {
      onDelete(task.id);
    }, 300);
  };

  return (
    <Card
      className={`
        transition-all duration-300 ease-in-out
        ${isDeleting ? 'opacity-0 scale-95 max-h-0 p-0 m-0 overflow-hidden' : 'opacity-100 scale-100 max-h-[200px]'}
        ${task.completed ? 'opacity-70 bg-green-50' : 'bg-white'}
      `}
    >
      <CardContent className="p-4 flex flex-col sm:flex-row items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 self-start transition-transform duration-200 hover:scale-110"
          aria-label={`Mark task "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
        />

        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg font-medium truncate transition-all duration-200 ${
              task.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p
              className={`mt-1 text-sm transition-all duration-200 ${
                task.completed ? 'line-through text-gray-400' : 'text-gray-600'
              }`}
            >
              {task.description}
            </p>
          )}

          <p className="mt-2 text-xs text-gray-500 transition-all duration-200">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-2 mt-2 sm:mt-0 self-start transition-all duration-200">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(task)}
            className="transition-transform duration-200 hover:scale-105"
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            className="transition-transform duration-200 hover:scale-105"
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { TaskItem };