import { useMemo, useState } from 'react';

import Header from './components/Header';
import TaskFilters from './components/TaskFilters';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskStats from './components/TaskStats';

import { useLocalStorage } from './hooks/useLocalStorage';

import {
  createTask,
  isTaskArray,
  type Priority,
  type PriorityFilter,
  type StatusFilter,
  type Task,
} from './types';

const STORAGE_KEY = 'focuslist.tasks.v1';

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(
    STORAGE_KEY,
    [],
    isTaskArray,
  );

  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>('all');
  const [priorityFilter, setPriorityFilter] =
    useState<PriorityFilter>('all');

  function addTask(title: string, priority: Priority) {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    const newTask = createTask(trimmedTitle, priority);

    setTasks((currentTasks) => [
      newTask,
      ...currentTasks,
    ]);
  }

  function toggleTask(id: string) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              updatedAt: Date.now(),
            }
          : task,
      ),
    );
  }

  function editTask(
    id: string,
    title: string,
    priority?: Priority,
  ) {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: trimmedTitle,
              ...(priority ? { priority } : {}),
              updatedAt: Date.now(),
            }
          : task,
      ),
    );
  }

  function deleteTask(id: string) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id),
    );
  }

  const completedCount = tasks.filter(
    (task) => task.completed,
  ).length;

  const pendingCount =
    tasks.length - completedCount;

  const visibleTasks = useMemo(() => {
    const normalizedQuery = query
      .trim()
      .toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        normalizedQuery === '' ||
        task.title
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' &&
          !task.completed) ||
        (statusFilter === 'completed' &&
          task.completed);

      const matchesPriority =
        priorityFilter === 'all' ||
        task.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    tasks,
    query,
    statusFilter,
    priorityFilter,
  ]);

  const hasActiveFilters =
    query.trim() !== '' ||
    statusFilter !== 'all' ||
    priorityFilter !== 'all';

  function clearFilters() {
    setQuery('');
    setStatusFilter('all');
    setPriorityFilter('all');
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Header />

        <TaskForm onAdd={addTask} />

        <TaskStats
          total={tasks.length}
          completed={completedCount}
          pending={pendingCount}
        />

        <TaskFilters
          query={query}
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          onQueryChange={setQuery}
          onStatusChange={setStatusFilter}
          onPriorityChange={setPriorityFilter}
        />

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="mb-4 px-2 text-sm text-slate-400">
            Showing {visibleTasks.length} of{' '}
            {tasks.length} task
            {tasks.length === 1 ? '' : 's'}.
          </p>

          <TaskList
            tasks={visibleTasks}
            totalTasks={tasks.length}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
            onToggle={toggleTask}
            onEdit={editTask}
            onDelete={deleteTask}
          />
        </div>
      </div>
    </main>
  );
}

export default App;