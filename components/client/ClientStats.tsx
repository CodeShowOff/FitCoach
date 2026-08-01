// src/components/client/ClientStats.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import {
  CLIENT_PROGRESS_SUMMARY_QUERY_KEY,
  fetchClientProgressSummary,
} from "@/lib/queries/clientProgress";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Scale, Ruler, HeartPulse } from "lucide-react";

function QuickStatsSkeleton() {
  return (
    <section>
      <div className="mb-4">
        <h3 className="m-0 text-base font-bold text-slate-900">Quick Stats</h3>
      </div>
      <div className="divide-y divide-slate-200/80 border-t border-slate-200/80">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex min-h-[96px] items-center justify-between gap-4 py-4 sm:min-h-[112px] sm:py-5"
          >
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-slate-100 sm:h-14 sm:w-14" />
              <div className="min-w-0 space-y-2">
                <div className="h-3 w-16 rounded bg-slate-200" />
                <div className="h-4 w-24 rounded bg-slate-200" />
              </div>
            </div>
            <div className="h-8 w-16 rounded bg-slate-200" />
          </div>
        ))}
      </div>
    </section>
  );
}

const ClientStats = React.memo(function ClientStats() {
  const { data: stats, isLoading } = useQuery({
    queryKey: CLIENT_PROGRESS_SUMMARY_QUERY_KEY,
    queryFn: fetchClientProgressSummary,
    staleTime: 60 * 1000,
  });

  const kpis = useMemo(() => [
    {
      label: "Weight",
      title: "Latest Weight (kg)",
      value: stats?.latestWeight != null ? stats.latestWeight : "--",
      Icon: Scale,
      tone: "from-blue-500 to-indigo-500"
    },
    {
      label: "BMI",
      title: "Latest BMI",
      value: stats?.latestBMI != null ? stats.latestBMI : "--",
      Icon: Ruler,
      tone: "from-emerald-500 to-teal-500"
    },
    {
      label: "Health",
      title: "Metabolic Age",
      value: stats?.latestMetabolicAge != null ? stats.latestMetabolicAge : "--",
      Icon: HeartPulse,
      tone: "from-rose-500 to-pink-500"
    }
  ], [stats]);

  if (isLoading) return <QuickStatsSkeleton />;

  return (
    <section>
      <div className="mb-4">
        <h3 className="m-0 text-base font-bold text-slate-900">Quick Stats</h3>
      </div>
      <div className="divide-y divide-slate-200/80 border-t border-slate-200/80">
        {kpis.map((item) => (
          <div
            key={item.title}
            className="flex min-h-[96px] items-center justify-between gap-4 py-4 sm:min-h-[112px] sm:py-5"
          >
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <span
                className={cn(
                  "grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-md shadow-slate-200/50 sm:h-14 sm:w-14",
                  item.tone,
                )}
              >
                <item.Icon className="h-6 w-6 sm:h-7 sm:w-7" />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500 sm:text-xs">
                  {item.label}
                </p>
                <h2 className="mt-0.5 truncate text-base font-bold tracking-tight text-slate-950 sm:text-lg">
                  {item.title}
                </h2>
              </div>
            </div>
            <div className="shrink-0 text-3xl font-bold leading-none tracking-tight text-slate-950 sm:text-4xl">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default ClientStats;
