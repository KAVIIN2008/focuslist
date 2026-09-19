import {
  CheckCircle2,
  Clock3,
  ListTodo,
} from 'lucide-react';

interface TaskStatsProps {
  total: number;
  completed: number;
  pending: number;
}

function TaskStats({
  total,
  completed,
  pending,
}: TaskStatsProps) {
  const stats = [
    {
      label: 'Total',
      value: total,
      icon: ListTodo,
      iconClass: 'text-indigo-400',
      bgClass: 'bg-indigo-500/10',
    },
    {
      label: 'Completed',
      value: completed,
      icon: CheckCircle2,
      iconClass: 'text-emerald-400',
      bgClass: 'bg-emerald-500/10',
    },
    {
      label: 'Pending',
      value: pending,
      icon: Clock3,
      iconClass: 'text-amber-400',
      bgClass: 'bg-amber-500/10',
    },
  ];

  return (
    <section
      aria-label="Task statistics"
      className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article
            key={stat.label}
            className="group rounded-2xl border border-slate-800 bg-slate-900 p-4 transition hover:border-slate-700 hover:bg-slate-900/90"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  {stat.label}
                </p>

                <p className="mt-1 text-2xl font-bold tracking-tight text-white">
                  {stat.value}
                </p>
              </div>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-105 ${stat.bgClass}`}
              >
                <Icon
                  size={19}
                  className={stat.iconClass}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default TaskStats;