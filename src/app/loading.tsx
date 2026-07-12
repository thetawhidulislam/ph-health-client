import { Activity } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Logo */}
        <div className="relative flex items-center justify-center">
          <div className="absolute h-24 w-24 animate-ping rounded-full bg-cyan-500/20" />

          <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-cyan-500/20 border-t-cyan-600 bg-card shadow-lg animate-spin">
            <Activity className="h-8 w-8 text-cyan-600 animate-pulse" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2 text-center">
          <h2 className="text-xl font-semibold tracking-tight">
            PH Healthcare
          </h2>

          <p className="text-sm text-muted-foreground">
            Loading your experience...
          </p>
        </div>

        {/* Progress Bars */}
        <div className="flex gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-600 [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-600 [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-600" />
        </div>
      </div>
    </div>
  );
}
