export default function UsersTable({ users = [], isLoading, onToggleBlock }) {
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="overflow-x-auto bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-[#FBFBFA] text-[11px] font-bold uppercase tracking-wider text-gray-500">
            <th className="py-3 px-6">Member</th>
            <th className="py-3 px-4">Role</th>
            <th className="py-3 px-4">Points</th>
            <th className="py-3 px-4">Joined</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {isLoading ? (
            <tr>
              <td colSpan="6" className="py-12 text-center text-gray-400">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-6 h-6 border-2 border-emerald-800 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs">Loading users...</p>
                </div>
              </td>
            </tr>
          ) : !Array.isArray(users) || users.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="py-12 text-center text-gray-400 text-xs"
              >
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => {
              const isBlocked = user.isBlocked;

              return (
                <tr key={user.id} className="hover:bg-gray-50/60 transition">
                  <td className="py-4 px-6 flex items-center space-x-3.5">
                    <div className="h-10 w-10 rounded-full bg-[#E6F4EA] text-[#134E2C] font-bold flex items-center justify-center text-xs border border-emerald-200">
                      {getInitials(user.fullname)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {user.fullname}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-gray-700">User</td>
                  <td className="py-4 px-4 text-gray-700 font-medium">
                    {user.points || 0}
                  </td>
                  <td className="py-4 px-4 text-gray-500 text-xs">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                        isBlocked
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isBlocked ? "bg-amber-500" : "bg-emerald-600"
                        }`}
                      />
                      {isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>

                  {/* Actions (Block / Unblock button) */}
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => onToggleBlock(user.id, isBlocked)}
                      title={isBlocked ? "Unblock User" : "Block User"}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                        isBlocked
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : "bg-rose-100 text-rose-800 hover:bg-rose-200"
                      }`}
                    >
                      {isBlocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
