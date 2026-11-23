import { MoreHorizontal } from "lucide-react";

export default function ReportsTable({ reports, onReportAction }) {
  // Helper to render status badge according to screenshot styling
  const renderStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Pending
          </span>
        );
      case "Resolved":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            Resolved
          </span>
        );
      case "Dismissed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
            Dismissed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="overflow-x-auto bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-[#FBFBFA] text-[11px] font-bold uppercase tracking-wider text-gray-500">
            <th className="py-3 px-6">Reported item</th>
            <th className="py-3 px-4">Reported by</th>
            <th className="py-3 px-4">Reason</th>
            <th className="py-3 px-4">Reported</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {reports?.map((report) => (
            <tr key={report.id} className="hover:bg-gray-50/60 transition">
              {/* Reported Item Details */}
              <td className="py-4 px-6 flex items-center space-x-3.5">
                <img
                  src={
                    report.image ||
                    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=100&auto=format&fit=crop&q=60"
                  }
                  alt={report.title}
                  className="h-11 w-11 rounded-lg object-cover border border-gray-200"
                />
                <div>
                  <p className="font-semibold text-gray-900">
                    {report.title || report.itemTitle}
                  </p>
                  <p className="text-xs text-gray-500">
                    {report.code || "#108"} · {report.itemOwner || "Maya Green"}
                  </p>
                </div>
              </td>

              <td className="py-4 px-4 text-gray-700">
                {report.reportedBy || report.user}
              </td>
              <td className="py-4 px-4 text-gray-700">{report.reason}</td>
              <td className="py-4 px-4 text-gray-500 text-xs">
                {report.date || report.createdAt}
              </td>

              {/* Status */}
              <td className="py-4 px-4">{renderStatusBadge(report.status)}</td>

              {/* Actions */}
              <td className="py-4 px-6 text-right">
                <button
                  onClick={() => onReportAction(report.id, "resolve")}
                  title="Manage Report"
                  className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
