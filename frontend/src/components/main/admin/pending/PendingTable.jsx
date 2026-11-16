import { Eye } from "lucide-react";
import { usePendingItemsStore } from "@/store/usePendingItemsStore";

export default function PendingTable({ items = [], isLoading, onReview }) {
  const { selectedItems, toggleSelectItem, toggleSelectAll } =
    usePendingItemsStore();

  const allIds = items?.map((item) => item.id) || [];
  const isAllSelected =
    allIds.length > 0 && selectedItems.length === allIds.length;

  return (
    <div className="overflow-x-auto bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-[#FBFBFA] text-[11px] font-bold uppercase tracking-wider text-gray-500">
            <th className="py-3 px-6 w-12">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={() => toggleSelectAll(allIds)}
                className="rounded border-gray-300 text-emerald-800 focus:ring-emerald-700 h-4 w-4 cursor-pointer"
              />
            </th>
            <th className="py-3 px-4">Item</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Condition</th>
            <th className="py-3 px-4">Submitted</th>
            <th className="py-3 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {Array.isArray(items) &&
            items.map((item) => {
              const isSelected = selectedItems.includes(item.id);
              return (
                <tr key={item.id} className="hover:bg-gray-50/60 transition">
                  <td className="py-4 px-6">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectItem(item.id)}
                      className="rounded border-gray-300 text-emerald-800 focus:ring-emerald-700 h-4 w-4 cursor-pointer"
                    />
                  </td>
                  <td className="py-4 px-4 flex items-center space-x-3.5">
                    <img
                      src={
                        item.images?.[0] || "https://via.placeholder.com/150"
                      }
                      alt={item.title}
                      className="h-11 w-11 rounded-lg object-cover border border-gray-200"
                    />
                    <div>
                      {/* Item Title */}
                      <p className="font-semibold text-gray-900">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.category} ·{" "}
                        {item.user?.fullname || item.user?.email || "N/A"}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{item.category}</td>
                  <td className="py-4 px-4 text-gray-700">{item.condition}</td>
                  <td className="py-4 px-4 text-gray-500 text-xs">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-right space-x-3">
                    <button
                      title="Inspect Item"
                      className="inline-flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-700 transition"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onReview(item.id, "reject")}
                      className="px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-gray-100 rounded-lg transition"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => onReview(item.id, "approve")}
                      className="px-4 py-1.5 text-xs font-semibold text-white bg-[#113C2F] hover:bg-[#0d2e24] rounded-lg transition shadow-xs"
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
