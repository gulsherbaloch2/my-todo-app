// src/app/dashboard/page.tsx
'use client';

import React, { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { useAuth } from '@/providers/auth-provider';
import { TaskList } from '@/components/task/task-list';
import { TaskForm } from '@/components/task/task-form';
import { Task } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogoutButton } from '@/components/auth/logout-button';

const DashboardPage: React.FC = () => {
  const { tasks, loading, error, createTask, updateTask, deleteTask, toggleTaskCompletion } = useTasks();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleCreateTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    await createTask(taskData);
    setShowForm(false);
  };

  const handleUpdateTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTask) {
      await updateTask(editingTask.id, taskData);
      setEditingTask(null);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Task Dashboard</h1>
          <div className="flex items-center space-x-4">
            {user && <span className="text-sm text-gray-600">Welcome, {user.name || user.email}</span>}
            <LogoutButton variant="outline" size="sm">Logout</LogoutButton>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Your Tasks</span>
              <Button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Add New Task'}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showForm && (
              <TaskForm
                task={editingTask || undefined}
                onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                onCancel={handleCancel}
              />
            )}
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
                {error}
              </div>
            )}
            
            <TaskList
              tasks={tasks}
              loading={loading}
              onToggle={toggleTaskCompletion}
              onEdit={handleEdit}
              onDelete={deleteTask}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DashboardPage;