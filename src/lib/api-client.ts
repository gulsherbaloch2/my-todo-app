// src/lib/api-client.ts
import { Task } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'API-Key': process.env.KRO_API_KEY || '', // Include KRO API key in headers
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Task API methods
  async getTasks(): Promise<{ success: boolean; data: Task[] }> {
    return this.request('/tasks');
  }

  async createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; data: Task }> {
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  async updateTask(id: string, taskData: Partial<Task>): Promise<{ success: boolean; data: Task }> {
    return this.request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  }

  async deleteTask(id: string): Promise<{ success: boolean; data: null }> {
    return this.request(`/tasks/${id}`, {
      method: 'DELETE',
    });
  }

  async toggleTaskCompletion(id: string): Promise<{ success: boolean; data: Task }> {
    return this.request(`/tasks/${id}/toggle-completion`, {
      method: 'PATCH',
    });
  }
}

export const apiClient = new ApiClient();