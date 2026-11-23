"use client";

import { useAdminData } from "@/hooks/useAdminData";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function PendingItems() {
  const { data } = useAdminData();
  const pendingItemsList = data?.pendingItems ?? [];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
            Needs Attention
          </p>
          <h3 className="text-lg font-bold text-gray-900">
            Recent pending items
          </h3>
        </div>
        <Link href="/admin/pendingItems">
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-emerald-800 hover:underline"
          >
            View all <ChevronRight className="h-4 w-4" />
          </button>
        </Link>
      </div>

      <div className="divide-y divide-gray-100">
        {pendingItemsList.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-3.5"
          >
            <div className="flex items-center space-x-3.5">
              <img
                src={item.image}
                alt={item.name || item.title || "Pending item"}
                className="h-10 w-10 rounded-lg object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {item.name || item.title}
                </p>
                <p className="text-xs text-gray-500">
                  {item.code}
                  {item.code && item.user ? " · " : ""}
                  {item.user?.fullname || item.user?.email || ""}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs text-gray-400">{item.date}</span>
              <button
                type="button"
                className="rounded-lg px-3 py-1.5 text-xs font-semibold text-emerald-800 transition hover:bg-gray-100"
              >
                Reject
              </button>
              <button
                type="button"
                className="rounded-lg bg-[#113C2F] px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-[#0d2e24]"
              >
                Approve
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
