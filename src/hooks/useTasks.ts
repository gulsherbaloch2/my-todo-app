// src/hooks/useTasks.ts
import { useState, useEffect } from 'react';
import { Task } from '@/types';
import { apiClient } from '@/lib/api-client';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getTasks();
      if (response.success) {
        setTasks(response.data);
      } else {
        setError('Failed to fetch tasks');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      // Optimistic update: add the task to the UI immediately
      const newTask: Task = {
        id: `temp-${Date.now()}`, // Temporary ID until API returns the real one
        ...taskData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setTasks(prev => [newTask, ...prev]); // Add to the top of the list

      const response = await apiClient.createTask(taskData);
      if (response.success) {
        // Replace the temporary task with the one from the API
        setTasks(prev =>
          prev.map(t => t.id === newTask.id ? response.data : t)
        );
        return response.data;
      } else {
        setError('Failed to create task');
        // Remove the optimistic task if API call failed
        setTasks(prev => prev.filter(t => t.id !== newTask.id));
        return null;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      // Remove the optimistic task if API call failed
      setTasks(prev => prev.filter(t => !t.id.startsWith('temp-')));
      return null;
    }
  };

  const updateTask = async (id: string, taskData: Partial<Task>) => {
    try {
      // Optimistic update: update the task in the UI immediately
      setTasks(prev =>
        prev.map(task =>
          task.id === id ? { ...task, ...taskData, updatedAt: new Date() } : task
        )
      );

      const response = await apiClient.updateTask(id, taskData);
      if (response.success) {
        // Update with the response from the API
        setTasks(prev =>
          prev.map(task =>
            task.id === id ? response.data : task
          )
        );
        return response.data;
      } else {
        setError('Failed to update task');
        // Revert the optimistic update if API call failed
        // We would need to store the original values to properly revert
        // For simplicity, we'll just refetch the tasks
        fetchTasks();
        return null;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      // Revert the optimistic update if API call failed
      fetchTasks();
      return null;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      // Optimistic update: remove the task from the UI immediately
      const deletedTask = tasks.find(task => task.id === id);
      setTasks(prev => prev.filter(task => task.id !== id));

      const response = await apiClient.deleteTask(id);
      if (response.success) {
        return true;
      } else {
        setError('Failed to delete task');
        // Restore the task if API call failed
        if (deletedTask) {
          setTasks(prev => [...prev, deletedTask]);
        }
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      // Restore the task if API call failed
      if (tasks.some(task => task.id === id)) {
        // Task was already gone, no need to restore
      } else {
        // Try to refetch tasks to restore the state
        fetchTasks();
      }
      return false;
    }
  };

  const toggleTaskCompletion = async (id: string) => {
    try {
      // Optimistic update: toggle the completion status in the UI immediately
      setTasks(prev =>
        prev.map(task =>
          task.id === id ? { ...task, completed: !task.completed, updatedAt: new Date() } : task
        )
      );

      const response = await apiClient.toggleTaskCompletion(id);
      if (response.success) {
        // Update with the response from the API
        setTasks(prev =>
          prev.map(task =>
            task.id === id ? response.data : task
          )
        );
        return response.data;
      } else {
        setError('Failed to toggle task completion');
        // Revert the optimistic update if API call failed
        // We'll refetch to ensure consistency
        fetchTasks();
        return null;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      // Revert the optimistic update if API call failed
      fetchTasks();
      return null;
    }
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
  };
};