import { useState, useMemo, useEffect } from "react";
import styles from "./UserTablePage.module.css";

// Fake data: this would normally come from an API
const USERS = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor" },
  { id: 3, name: "Carol Lee", email: "carol@example.com", role: "Viewer" },
  { id: 4, name: "David Kim", email: "david@example.com", role: "Viewer" },
  { id: 5, name: "Eve Chan", email: "eve@example.com", role: "Editor" },
  { id: 6, name: "Frank Miller", email: "frank@example.com", role: "Viewer" },
  { id: 7, name: "Grace Brown", email: "grace@example.com", role: "Admin" },
  { id: 8, name: "Henry Wilson", email: "henry@example.com", role: "Viewer" },
  { id: 9, name: "Ivy Davis", email: "ivy@example.com", role: "Editor" },
  { id: 10, name: "Jack Taylor", email: "jack@example.com", role: "Viewer" },
];

const PAGE_SIZE = 5;

function UserTable() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "desc",
  });

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return USERS;

    return USERS.filter(
      ({ name, email }) =>
        name.toLowerCase().includes(term) || email.toLowerCase().includes(term),
    );
  }, [search]);

  const sortValue = (user, key) => user[key]?.toLowerCase();

  const sortedUsers = useMemo(() => {
    if (!sortConfig.key) return filteredUsers;

    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (sortValue(a, sortConfig.key) === sortValue(b, sortConfig.key))
        return 0;
      return sortValue(a, sortConfig.key) > sortValue(b, sortConfig.key)
        ? 1
        : -1;
    });
    return sortConfig.direction === "asc" ? sortedUsers : sortedUsers.reverse();
  }, [filteredUsers, sortConfig]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredUsers.length / PAGE_SIZE);
  }, [filteredUsers]);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  const paginatedUsers = useMemo(() => {
    return sortedUsers.slice(
      (currentPage - 1) * PAGE_SIZE,
      currentPage * PAGE_SIZE,
    );
  }, [sortedUsers, currentPage]);

  const handleSearchChange = (e) => {
    setCurrentPage(1);
    setSearch(e.target.value);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [sortConfig]);

  return (
    <div
      style={{ maxWidth: 800, margin: "2rem auto", fontFamily: "sans-serif" }}
    >
      <h1>User Table</h1>
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Search by name or email:&nbsp;
          <input onChange={handleSearchChange} />
        </label>
      </div>
      {/* Table */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {["name", "email", "role"].map((key) => {
                return (
                  <th key={key} className={styles.th}>
                    <button
                      onClick={() => {
                        setSortConfig({
                          ...sortConfig,
                          key,
                          direction:
                            sortConfig.key === key &&
                            sortConfig.direction === "desc"
                              ? "asc"
                              : "desc",
                        });
                      }}
                    >
                      {key}
                      {sortConfig.key === key &&
                        (sortConfig.direction === "desc" ? " v" : " ^")}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        {
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
        }
        {
          <span>
            Page {currentPage} of {totalPages}
          </span>
        }
        {
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        }
      </div>
    </div>
  );
}

export default UserTable;
