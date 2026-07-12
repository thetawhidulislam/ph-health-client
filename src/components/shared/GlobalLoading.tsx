import { Activity } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading PH Healthcare experience"
      className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-background/95 px-4 backdrop-blur-sm animate-fade-in"
    >
      <div className="flex w-full max-w-sm flex-col items-center gap-6 rounded-[2rem] border border-slate-200/70 bg-card/95 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-950/95 dark:shadow-cyan-400/10">
        <div className="relative flex h-28 w-28 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-cyan-500/20 animate-pulse" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-cyan-500/20 border-t-cyan-600 bg-background shadow-lg shadow-cyan-500/10 dark:bg-slate-950">
            <Activity className="h-9 w-9 text-cyan-600 animate-spin" />
          </div>
        </div>

        <div className="space-y-2 text-center">
          <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            PH Healthcare
          </h2>
          <p className="text-sm text-muted-foreground">
            Loading your healthcare experience...
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-600 animate-bounce [animation-delay:0s]" />
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-600/90 animate-bounce [animation-delay:0.12s]" />
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-600/80 animate-bounce [animation-delay:0.24s]" />
        </div>
      </div>
    </div>
  );
}
