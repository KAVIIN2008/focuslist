import { Search, Check } from 'lucide-react';

import TaskItem from './TaskItem';
import type { Priority, Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  totalTasks: number;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onToggle: (id: string) => void;
  onEdit: (id: string, title: string, priority: Priority) => void;
  onDelete: (id: string) => void;
}

function TaskList({
  tasks,
  totalTasks,
  hasActiveFilters,
  onClearFilters,
  onToggle,
  onEdit,
  onDelete,
}: TaskListProps) {
  if (tasks.length === 0) {
    if (totalTasks === 0) {
      return (
        <section
          aria-live="polite"
          className="mt-6 rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 px-6 py-12 text-center"
        >
          <div className="mx-auto max-w-md">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-400">
              <Check size={22} aria-hidden="true" />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-slate-200">
              No tasks yet
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Add your first task above and start focusing.
            </p>
          </div>
        </section>
      );
    }

    return (
      <section
        aria-live="polite"
        className="mt-6 rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 px-6 py-12 text-center"
      >
        <div className="mx-auto max-w-md">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-400">
            <Search size={22} aria-hidden="true" />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-slate-200">
            No matching tasks
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Try changing your search or filters.
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="mt-5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Clear filters
            </button>
          )}
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label="Task list"
      className="mt-6 space-y-3"
    >
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}

export default TaskList;