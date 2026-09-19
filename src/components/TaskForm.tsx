import { Plus } from 'lucide-react';
import { useState, type FormEvent } from 'react';

import type { Priority } from '../types';

interface TaskFormProps {
  onAdd: (title: string, priority: Priority) => void;
}

function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] =
    useState<Priority>('medium');

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    onAdd(trimmedTitle, priority);
    setTitle('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-xl shadow-black/10"
    >
      <div className="mb-3">
        <h2 className="text-sm font-semibold text-slate-200">
          Add a task
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Capture what you need to accomplish next.
        </p>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="min-w-0 flex-1">
          <label
            htmlFor="task-title"
            className="sr-only"
          >
            Task title
          </label>

          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            placeholder="What needs to be done?"
            autoComplete="off"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-row">
          <div className="flex-1 sm:min-w-40 lg:w-40 lg:flex-none">
            <label
              htmlFor="task-priority"
              className="sr-only"
            >
              Task priority
            </label>

            <select
              id="task-priority"
              value={priority}
              onChange={(event) =>
                setPriority(
                  event.target.value as Priority,
                )
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition hover:border-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="high">
                High Priority
              </option>

              <option value="medium">
                Medium Priority
              </option>

              <option value="low">
                Low Priority
              </option>
            </select>
          </div>

          <button
            type="submit"
            disabled={!title.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/10 transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus
              size={18}
              strokeWidth={2.5}
              aria-hidden="true"
            />

            Add Task
          </button>
        </div>
      </div>
    </form>
  );
}

export default TaskForm;