// src/app/(client)/dashboard/page.tsx
"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { UserCircle2 } from "lucide-react";
import { useMyCoachQuery } from "@/lib/queries/coach";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import WaterIntakeWidget from "@/components/client/WaterIntakeWidget";
import GoalWeightWidget from "@/components/client/GoalWeightWidget";
import { cn } from "@/lib/utils";

const dashboardActions = [
  {
    title: "Today's Workout",
    href: "/client/workouts/today",
    image: "/images/dashboard/client-workout.webp",
    imageAlt: "A sleek modern kettlebell and a folded gym towel on a vibrant orange background",
  },
  {
    title: "Today's Diet",
    href: "/client/diet/today",
    image: "/images/dashboard/client-diet.webp",
    imageAlt: "A healthy, colorful meal prep bowl on a fresh lime green background",
  },
  {
    title: "Nutrition Index",
    href: "/indian-nutrition-index",
    image: "/images/dashboard/client-nutrition.webp",
    imageAlt: "An open, modern health encyclopedia and a shiny red apple on a cyan background",
  },
  {
    title: "Calorie Calculator",
    href: "/calorie-calculator",
    image: "/images/dashboard/client-calories.webp",
    imageAlt: "A modern digital scale and a measuring tape on a vivid indigo background",
  },
] as const;

function QuickStatsLoadingContent() {
  return (
    <section>
      <div className="mb-4">
        <h3 className="m-0 text-base font-bold text-slate-900">Quick Stats</h3>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-blue-200/80 bg-gradient-to-br from-blue-100/70 via-blue-50/80 to-white p-5">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-10 w-10 rounded-[10px] bg-blue-500/80" />
            <div className="h-3.5 w-28 rounded bg-slate-300/70" />
          </div>
          <div className="h-9 w-24 rounded bg-slate-300/70" />
        </div>

        <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-100/70 via-emerald-50/80 to-white p-5">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-10 w-10 rounded-[10px] bg-emerald-500/80" />
            <div className="h-3.5 w-28 rounded bg-slate-300/70" />
          </div>
          <div className="h-9 w-24 rounded bg-slate-300/70" />
        </div>

        <div className="rounded-2xl border border-amber-200/90 bg-gradient-to-br from-amber-100/70 via-amber-50/80 to-white p-5">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-10 w-10 rounded-[10px] bg-amber-500/80" />
            <div className="h-3.5 w-28 rounded bg-slate-300/70" />
          </div>
          <div className="h-9 w-24 rounded bg-slate-300/70" />
        </div>
      </div>
    </section>
  );
}

const ClientStats = dynamic(() => import("@/components/client/ClientStats"), {
  ssr: false,
  loading: () => <QuickStatsLoadingContent />,
});

function ConnectedWithCompanyName({ companyName }: { companyName: string }) {
  return (
    <div className="min-w-0 max-w-[55vw] sm:max-w-[220px]" aria-label={companyName}>
      <span className="block truncate text-xs font-semibold text-slate-700 sm:text-sm" title={companyName}>
        {companyName}
      </span>
    </div>
  );
}

export default function ClientDashboardPage() {
  const { data: coach } = useMyCoachQuery();
  const [isMobileViewport, setIsMobileViewport] = useState<boolean | null>(null);
  const quickStatsSectionRef = useRef<HTMLElement | null>(null);
  const [shouldRenderQuickStats, setShouldRenderQuickStats] = useState(false);
  const hasResolvedViewport = isMobileViewport !== null;

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const handleChange = () => setIsMobileViewport(mediaQuery.matches);

    handleChange();

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (shouldRenderQuickStats) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldRenderQuickStats(true);
      return;
    }

    const target = quickStatsSectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setShouldRenderQuickStats(true);
        observer.disconnect();
      },
      { rootMargin: "280px 0px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [shouldRenderQuickStats]);

  return (
    <div className="client-page__sections space-y-4 md:space-y-5">
      <section>
        <Card className="overflow-hidden border-indigo-100/70 bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-600 text-white">
          <CardHeader className="gap-3 p-4 sm:p-6">
            <div className="space-y-2">
              <div className="flex min-w-0 items-center justify-between gap-2">
                <h1 className="whitespace-nowrap text-lg font-bold tracking-tight text-white sm:text-3xl">My dashboard</h1>

                {coach ? (
                  <Link href="/client/coach" className="shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 border-white/25 bg-white/10 px-2 text-[10px] text-white hover:bg-white/20 hover:text-white sm:h-9 sm:px-3.5 sm:text-sm"
                    >
                      <UserCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span className="sm:hidden">Coach Profile</span>
                      <span className="hidden sm:inline">View Coach Profile</span>
                    </Button>
                  </Link>
                ) : null}
              </div>

              <CardDescription className="hidden max-w-2xl text-sm !text-white/90 sm:block sm:text-base">
                Track workouts, nutrition, hydration, and progress from one focused dashboard.
              </CardDescription>
            </div>
          </CardHeader>
        </Card>

        {coach ? (
          <div className="mt-2 flex min-w-0 items-center justify-center gap-1.5 text-center">
            <span className="whitespace-nowrap text-xs text-slate-600 sm:text-sm">Connected with</span>
            <ConnectedWithCompanyName companyName={coach.companyName || "FitCoach"} />
          </div>
        ) : null}
      </section>

      <section>
        <div className="grid grid-cols-2 items-stretch gap-1.5 sm:grid-cols-1 sm:gap-4 xl:grid-cols-2">
          <div className="min-w-0 h-full">
            {hasResolvedViewport ? (
              <WaterIntakeWidget compact={isMobileViewport} />
            ) : (
              <div className="h-full min-h-[270px] rounded-2xl border border-slate-200 bg-slate-100/70" />
            )}
          </div>
          <div className="min-w-0 h-full">
            {hasResolvedViewport ? (
              <GoalWeightWidget compact={isMobileViewport} />
            ) : (
              <div className="h-full min-h-[270px] rounded-2xl border border-slate-200 bg-slate-100/70" />
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {dashboardActions.map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              className="group block h-full cursor-pointer select-none overflow-hidden rounded-[22px] border border-slate-200/80 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_38px_rgba(15,23,42,0.14)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 focus-visible:ring-offset-2"
            >
              <article className="flex h-full min-h-[164px] flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 sm:aspect-[21/9] xl:aspect-[3/1]">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 639px) calc(50vw - 1.25rem), (max-width: 1279px) calc(50vw - 2rem), 50vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.035]"
                  />
                </div>
                <div className="flex min-h-[62px] flex-1 flex-col justify-center px-3 py-2.5 sm:min-h-[82px] sm:px-5 sm:py-4">
                  <h2 className="text-sm font-bold tracking-tight text-slate-950 sm:text-lg">
                    {item.title}
                  </h2>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <section ref={quickStatsSectionRef}>
        {shouldRenderQuickStats ? (
          <Card className="border-slate-200/80 bg-white/95">
            <CardContent className="p-4 pt-5 sm:p-5">
              <ClientStats />
            </CardContent>
          </Card>
        ) : (
          <Card className="border-slate-200/80 bg-white/95">
            <CardContent className="p-4 pt-5 sm:p-5">
              <QuickStatsLoadingContent />
            </CardContent>
          </Card>
        )}
      </section>

    </div>
  );
}
