import { useEffect, useState } from "react";
import { getUsers } from "../api/adminApi";

const LIMIT = 5;

const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState<string>("");

  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);

    const params: any = {
      limit: LIMIT,
      offset: page * LIMIT,
    };

    if (search) params.search = search;
    if (role) params.role = role;
    if (isActive !== "") params.is_active = isActive === "true";

    const res = await getUsers(params);

    setUsers(res.users_data);
    setTotal(res.user_total);

    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search, role, isActive]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin – User Management</h2>

      {/* Filters */}
      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Search by email"
          value={search}
          onChange={(e) => {
            setPage(0);
            setSearch(e.target.value);
          }}
        />

        <select
          value={role}
          onChange={(e) => {
            setPage(0);
            setRole(e.target.value);
          }}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <select
          value={isActive}
          onChange={(e) => {
            setPage(0);
            setIsActive(e.target.value);
          }}
        >
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border={1} cellPadding={10}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.is_active ? "Active" : "Inactive"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div style={{ marginTop: 20 }}>
        <button
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page + 1} of {Math.ceil(total / LIMIT) || 1}
        </span>

        <button
          disabled={(page + 1) * LIMIT >= total}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminUsers;
