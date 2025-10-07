import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";

const AdminPanel = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user: currentUser } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  // ✅ Fetch admin stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin/stats");
      return data;
    },
  });

  // ✅ Fetch users (with optional search)
  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ["admin-users", searchQuery, pagination.page, pagination.limit],
    queryFn: async () => {
      if (searchQuery.trim()) {
        const { data } = await axiosSecure.get(
          `/admin/users/search?query=${encodeURIComponent(searchQuery)}`
        );
        return { users: data, pagination: null };
      } else {
        const { data } = await axiosSecure.get(
          `/admin/users?page=${pagination.page}&limit=${pagination.limit}`
        );
        return data;
      }
    },
    keepPreviousData: true,
  });

  // ✅ Toggle admin role
  const toggleAdminRole = useMutation({
    mutationFn: async (userId) => {
      const { data } = await axiosSecure.patch(
        `/admin/users/${userId}/toggle-admin`,
        { currentUserEmail: currentUser?.email }
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["admin-users"]);
      queryClient.invalidateQueries(["admin-stats"]);
      Swal.fire("Success", data.message || "Role updated successfully!", "success");
    },
    onError: (error) => {
      Swal.fire("Error", error.response?.data?.message || "Failed to update role!", "error");
    },
  });

  const users = usersData?.users || [];
  const paginationInfo = usersData?.pagination;

  // ✅ Handlers
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries(["admin-users"]);
    queryClient.invalidateQueries(["admin-stats"]);
    Swal.fire("Refreshed!", "Data has been updated.", "success");
  };

  const handleRoleChange = (user) => {
    Swal.fire({
      title: `Are you sure?`,
      text:
        user.role === "admin"
          ? `Remove ${user.name || "this user"} as Admin?`
          : `Make ${user.name || "this user"} an Admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        toggleAdminRole.mutate(user._id);
      }
    });
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Admin Dashboard
      </h1>

      {/* ==== Stats ==== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Users", value: stats?.totalUsers },
          { label: "Admins", value: stats?.totalAdmins },
          { label: "Test Results", value: stats?.totalResults },
          { label: "Applications", value: stats?.totalApplications },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-2xl p-5 flex flex-col items-center justify-center hover:shadow-lg transition"
          >
            <p className="text-gray-500 text-sm">{item.label}</p>
            <h2 className="text-2xl font-bold text-blue-600 mt-1">
              {statsLoading ? "..." : item.value || 0}
            </h2>
          </div>
        ))}
      </div>

      {/* ==== Search and Refresh ==== */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <input
          type="text"
          placeholder="🔍 Search users..."
          value={searchQuery}
          onChange={handleSearch}
          className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleRefresh}
          disabled={usersLoading}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          Refresh
        </button>
      </div>

      {/* ==== Users Table ==== */}
      <div className="bg-white shadow-md rounded-2xl overflow-x-auto">
        {usersLoading ? (
          <p className="text-center p-6 text-gray-500 animate-pulse">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-center p-6 text-gray-500">No users found.</p>
        ) : (
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-blue-100 border-b">
              <tr>
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Email</th>
                <th className="p-3 font-semibold">Role</th>
                <th className="p-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b hover:bg-blue-50 transition">
                  <td className="p-3">{u.name || "No name"}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3 capitalize">{u.role}</td>
                  <td className="p-3 text-center">
                    {u.email === currentUser?.email ? (
                      <span className="text-gray-400 italic">Current User</span>
                    ) : (
                      <button
                        onClick={() => handleRoleChange(u)}
                        disabled={
                          toggleAdminRole.isLoading && toggleAdminRole.variables === u._id
                        }
                        className={`px-4 py-1.5 rounded-lg text-white font-medium transition ${
                          u.role === "admin"
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        {toggleAdminRole.isLoading &&
                        toggleAdminRole.variables === u._id
                          ? "Updating..."
                          : u.role === "admin"
                          ? "Remove Admin"
                          : "Make Admin"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* ==== Pagination ==== */}
        {paginationInfo && paginationInfo.pages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 p-4 border-t text-sm">
            <p>
              Page <b>{paginationInfo.page}</b> of {paginationInfo.pages}
            </p>
            <div className="space-x-2">
              <button
                onClick={() => handlePageChange(paginationInfo.page - 1)}
                disabled={paginationInfo.page === 1}
                className="border rounded-lg px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(paginationInfo.page + 1)}
                disabled={paginationInfo.page === paginationInfo.pages}
                className="border rounded-lg px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
