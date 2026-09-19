export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: number;
  updatedAt: number;
}

export type StatusFilter = 'all' | 'active' | 'completed';

export type PriorityFilter = Priority | 'all';

export const PRIORITIES: Priority[] = ['high', 'medium', 'low'];

export function createTask(title: string, priority: Priority): Task {
  const now = Date.now();

  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    completed: false,
    priority,
    createdAt: now,
    updatedAt: now,
  };
}

export function isTask(value: unknown): value is Task {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const task = value as Partial<Task>;

  return (
    typeof task.id === 'string' &&
    typeof task.title === 'string' &&
    typeof task.completed === 'boolean' &&
    typeof task.priority === 'string' &&
    PRIORITIES.includes(task.priority as Priority) &&
    typeof task.createdAt === 'number' &&
    typeof task.updatedAt === 'number'
  );
}
export function isTaskArray(value: unknown): value is Task[] {
  return Array.isArray(value) && value.every(isTask);
}