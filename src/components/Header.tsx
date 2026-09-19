import { CheckCircle2 } from 'lucide-react';

function Header() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/20">
            <CheckCircle2
              size={24}
              className="text-white"
              strokeWidth={2.5}
              aria-hidden="true"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              FocusList
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Your simple space to focus and get things done.
            </p>
          </div>
        </div>
      </div>

      <div className="hidden text-right sm:block">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-600">
          Stay focused
        </p>

        <p className="mt-1 text-sm text-slate-400">
          One task at a time.
        </p>
      </div>
    </header>
  );
}

export default Header;