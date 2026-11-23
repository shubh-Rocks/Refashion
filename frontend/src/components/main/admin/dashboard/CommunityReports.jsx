import { useAdminData } from "@/hooks/useAdminData";
import { Flag, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function CommunityReports({ reports }) {
  const { data } = useAdminData();
  const pendingReports = data?.reports ?? [];
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
            Community Care
          </p>
          <h3 className="text-lg font-bold text-gray-900">Recent reports</h3>
        </div>
        <Link href={"/admin/reports"}>
          <button className="flex items-center gap-1 text-sm font-semibold text-emerald-800 hover:underline">
            View all <ChevronRight className="h-4 w-4" />
          </button>
        </Link>
      </div>

      <div className="divide-y divide-gray-100">
        {pendingReports?.map((report) => (
          <div
            key={report.id}
            className="flex items-center justify-between py-3.5"
          >
            <div className="flex items-start space-x-3">
              <div className="mt-0.5 rounded-lg bg-amber-50 p-2 text-amber-700">
                <Flag className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {report.title}
                </p>
                <p className="text-xs text-gray-500">
                  {report.reason} · {report.date}
                </p>
              </div>
            </div>
            <div className="bg-amber-100 flex items-center rounded-[5px] ">
              <span className="rounded-full px-3 py-1 text-xs font-medium text-green-800">
                {report.status.toLowerCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
