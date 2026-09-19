import {
  Check,
  Pencil,
  Trash2,
  X,
} from 'lucide-react';
import {
  useState,
  type KeyboardEvent,
} from 'react';

import type {
  Priority,
  Task,
} from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (
    id: string,
    title: string,
    priority: Priority,
  ) => void;
  onDelete: (id: string) => void;
}

const priorityStyles: Record<
  Priority,
  {
    label: string;
    className: string;
    dotClassName: string;
  }
> = {
  high: {
    label: 'High',
    className:
      'bg-red-500/10 text-red-400 ring-1 ring-inset ring-red-500/20',
    dotClassName: 'bg-red-400',
  },
  medium: {
    label: 'Medium',
    className:
      'bg-amber-500/10 text-amber-400 ring-1 ring-inset ring-amber-500/20',
    dotClassName: 'bg-amber-400',
  },
  low: {
    label: 'Low',
    className:
      'bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20',
    dotClassName: 'bg-emerald-400',
  },
};

function TaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
}: TaskItemProps) {
  const [isEditing, setIsEditing] =
    useState(false);

  const [draftTitle, setDraftTitle] =
    useState(task.title);

  const [draftPriority, setDraftPriority] =
    useState<Priority>(task.priority);

  const priority =
    priorityStyles[task.priority];

  function startEditing() {
    setDraftTitle(task.title);
    setDraftPriority(task.priority);
    setIsEditing(true);
  }

  function cancelEditing() {
    setDraftTitle(task.title);
    setDraftPriority(task.priority);
    setIsEditing(false);
  }

  function saveEditing() {
    const trimmedTitle =
      draftTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    onEdit(
      task.id,
      trimmedTitle,
      draftPriority,
    );

    setIsEditing(false);
  }

  function handleEditKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === 'Enter') {
      event.preventDefault();
      saveEditing();
    }

    if (event.key === 'Escape') {
      cancelEditing();
    }
  }

  function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${task.title}"?`,
    );

    if (confirmed) {
      onDelete(task.id);
    }
  }

  if (isEditing) {
    return (
      <article className="rounded-2xl border border-indigo-500/40 bg-slate-900 p-4 shadow-lg shadow-indigo-950/10">
        <div className="flex flex-col gap-4">
          <div>
            <label
              htmlFor={`edit-task-${task.id}`}
              className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500"
            >
              Edit task
            </label>

            <input
              id={`edit-task-${task.id}`}
              type="text"
              value={draftTitle}
              onChange={(event) =>
                setDraftTitle(
                  event.target.value,
                )
              }
              onKeyDown={
                handleEditKeyDown
              }
              autoFocus
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <label
                htmlFor={`edit-priority-${task.id}`}
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500"
              >
                Priority
              </label>

              <select
                id={`edit-priority-${task.id}`}
                value={draftPriority}
                onChange={(event) =>
                  setDraftPriority(
                    event.target
                      .value as Priority,
                  )
                }
                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition hover:border-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="high">
                  High
                </option>

                <option value="medium">
                  Medium
                </option>

                <option value="low">
                  Low
                </option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={cancelEditing}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-500 sm:flex-none"
              >
                <X
                  size={16}
                  aria-hidden="true"
                />
                Cancel
              </button>

              <button
                type="button"
                onClick={saveEditing}
                disabled={!draftTitle.trim()}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
              >
                <Check
                  size={16}
                  aria-hidden="true"
                />
                Save
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-600">
            Press Enter to save or Escape to
            cancel.
          </p>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`group rounded-2xl border p-4 transition-all ${
        task.completed
          ? 'border-slate-800/80 bg-slate-900/50'
          : 'border-slate-800 bg-slate-900 hover:border-slate-700 hover:bg-slate-900/90 hover:shadow-lg hover:shadow-black/10'
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() =>
            onToggle(task.id)
          }
          aria-label={
            task.completed
              ? `Mark "${task.title}" as active`
              : `Mark "${task.title}" as completed`
          }
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950 ${
            task.completed
              ? 'border-indigo-500 bg-indigo-600 text-white'
              : 'border-slate-600 text-transparent hover:border-indigo-400 hover:bg-indigo-500/10'
          }`}
        >
          <Check
            size={13}
            strokeWidth={3}
            aria-hidden="true"
          />
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p
                className={`break-words text-sm font-medium leading-6 sm:text-base ${
                  task.completed
                    ? 'text-slate-500 line-through decoration-slate-600'
                    : 'text-slate-100'
                }`}
              >
                {task.title}
              </p>

              <p
                className={`mt-1 text-xs ${
                  task.completed
                    ? 'text-slate-600'
                    : 'text-slate-500'
                }`}
              >
                {task.completed
                  ? 'Completed'
                  : 'Active task'}
              </p>
            </div>

            <span
              className={`inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${priority.className}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${priority.dotClassName}`}
                aria-hidden="true"
              />

              {priority.label}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1 opacity-70 transition-opacity group-hover:opacity-100">
          <button
            type="button"
            onClick={startEditing}
            aria-label={`Edit "${task.title}"`}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Pencil
              size={17}
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            onClick={handleDelete}
            aria-label={`Delete "${task.title}"`}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <Trash2
              size={17}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </article>
  );
}

export default TaskItem;