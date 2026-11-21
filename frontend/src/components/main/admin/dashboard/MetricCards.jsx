import {
  useAdminData,
  usePendingItemsCount,
  useTotalUserCount,
} from "@/hooks/useAdminData";
import { Users, Box, ShieldAlert, RefreshCw } from "lucide-react";

export default function MetricCards() {
  const {
    data,
    totalUsers,
    pendingCount,
    blockedCount,
    isLoading,
    isError,
    error,
    refetch,
  } = useAdminData();

  const usersCount = totalUsers ?? data?.totalUsers ?? 0;
  const pendingItemsCount = pendingCount ?? data?.pendingCount ?? 0;
  const blockedUsersCount =
    blockedCount ?? data?.totalBlockUser ?? data?.blockedUsers ?? 0;

  const cards = [
    {
      title: "Total users",
      subtitle: "Registered platform accounts",
      value: usersCount,
      icon: Users,
      iconWrapClass: "bg-slate-100 text-slate-700",
      cardClass: "border-slate-200/90 hover:border-slate-300",
    },
    {
      title: "Total items",
      subtitle: "Pending & active listings",
      value: pendingItemsCount,
      icon: Box,
      iconWrapClass: "bg-blue-50 text-blue-600",
      cardClass: "border-slate-200/90 hover:border-blue-200",
    },
    {
      title: "Blocked users",
      subtitle: "Restricted accounts",
      value: blockedUsersCount,
      icon: ShieldAlert,
      iconWrapClass:
        blockedUsersCount > 0
          ? "bg-red-50 text-red-600"
          : "bg-emerald-50 text-emerald-600",
      cardClass:
        blockedUsersCount > 0
          ? "border-red-200/80 hover:border-red-300"
          : "border-slate-200/90 hover:border-slate-300",
    },
  ];

  if (isError) {
    return (
      <div className="mb-10 flex flex-col items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50/60 p-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-red-900">
            Metrics load nahi ho paaye
          </p>
          <p className="mt-0.5 text-xs text-red-700">
            {error?.message ||
              "Admin dashboard data fetch karte waqt error aaya."}
          </p>
        </div>
        {typeof refetch === "function" && (
          <button
            type="button"
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-3.5 py-2 text-xs font-medium text-red-700 shadow-2xs transition hover:bg-red-50"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, idx) => {
        const Icon = card.icon;

        return (
          <div
            key={idx}
            className={`group flex flex-col justify-between rounded-xl border bg-white p-5 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${card.cardClass}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  {card.title}
                </p>
                <p className="mt-1 text-xs text-slate-400">{card.subtitle}</p>
              </div>
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105 ${card.iconWrapClass}`}
              >
                <Icon className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-5 flex items-baseline justify-between">
              {isLoading ? (
                <div className="h-9 w-24 animate-pulse rounded-md bg-slate-100" />
              ) : (
                <span className="text-3xl font-bold tracking-tight text-slate-900 tabular-nums">
                  {Number(card.value).toLocaleString()}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
