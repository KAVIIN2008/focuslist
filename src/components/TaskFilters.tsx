import {
  Search,
  SlidersHorizontal,
} from 'lucide-react';

import type {
  PriorityFilter,
  StatusFilter,
} from '../types';

interface TaskFiltersProps {
  query: string;
  statusFilter: StatusFilter;
  priorityFilter: PriorityFilter;
  onQueryChange: (query: string) => void;
  onStatusChange: (status: StatusFilter) => void;
  onPriorityChange: (priority: PriorityFilter) => void;
}

const statusOptions: {
  value: StatusFilter;
  label: string;
}[] = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'active',
    label: 'Active',
  },
  {
    value: 'completed',
    label: 'Completed',
  },
];

const priorityOptions: {
  value: PriorityFilter;
  label: string;
}[] = [
  {
    value: 'all',
    label: 'All priorities',
  },
  {
    value: 'high',
    label: 'High',
  },
  {
    value: 'medium',
    label: 'Medium',
  },
  {
    value: 'low',
    label: 'Low',
  },
];

function TaskFilters({
  query,
  statusFilter,
  priorityFilter,
  onQueryChange,
  onStatusChange,
  onPriorityChange,
}: TaskFiltersProps) {
  return (
    <section
      aria-label="Task filters"
      className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-4"
    >
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
          <SlidersHorizontal
            size={16}
            aria-hidden="true"
          />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-slate-200">
            Find tasks
          </h2>

          <p className="text-xs text-slate-500">
            Search or narrow your task list.
          </p>
        </div>
      </div>

      <div className="mt-4">
        <label
          htmlFor="task-search"
          className="sr-only"
        >
          Search tasks
        </label>

        <div className="relative">
          <Search
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            id="task-search"
            type="search"
            value={query}
            onChange={(event) =>
              onQueryChange(event.target.value)
            }
            placeholder="Search tasks..."
            autoComplete="off"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4 border-t border-slate-800 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
            Status
          </p>

          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter by status"
          >
            {statusOptions.map((option) => {
              const isActive =
                statusFilter === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    onStatusChange(option.value)
                  }
                  aria-pressed={isActive}
                  className={`rounded-lg px-3.5 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="sm:min-w-44">
          <label
            htmlFor="priority-filter"
            className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500"
          >
            Priority
          </label>

          <select
            id="priority-filter"
            value={priorityFilter}
            onChange={(event) =>
              onPriorityChange(
                event.target.value as PriorityFilter,
              )
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition hover:border-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          >
            {priorityOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}

export default TaskFilters;