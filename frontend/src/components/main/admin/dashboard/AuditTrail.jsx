import { Check } from "lucide-react";

export default function AuditTrail({ activity }) {
  return (
    <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
      <div className="mb-4">
        <p className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
          Audit Trail
        </p>
        <h3 className="text-lg font-bold text-gray-900">Recent activity</h3>
      </div>

      <div className="divide-y divide-gray-100">
        {activity?.map((act) => (
          <div
            key={act.id}
            className="flex items-center justify-between py-3.5"
          >
            <div className="flex items-center space-x-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <Check className="h-4 w-4" />
              </div>
              <p className="text-sm text-gray-800">{act.text}</p>
            </div>
            <span className="text-xs text-gray-400">{act.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
