import React, { useState, useMemo } from "react";

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
  { id: 10, name: "Jack Taylor", email: "jack@example.com", role: "Viewer" }
];

const PAGE_SIZE = 5;

function UserTable() {
  // TODO: search term state
  // const [search, setSearch] = useState("");
  const [search, setSearch] = useState("")

  // TODO: current page state (1-based index)
  // const [currentPage, setCurrentPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
  // TODO (bonus): sort state: column + direction
  // const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // TODO: derived filteredUsers based on search
  // - filter USERS by name OR email containing the search term (case-insensitive)
  // - use useMemo to avoid recomputing on every render if you like
  // const filteredUsers = useMemo(() => { ... }, [search]);

  // TODO (bonus): apply sorting to filteredUsers based on sortConfig
  // const sortedUsers = useMemo(() => { ... }, [filteredUsers, sortConfig]);

  // TODO: compute paginated users
  // - figure out start index and end index based on currentPage and PAGE_SIZE
  // - slice the sortedUsers (or filteredUsers if you skip sorting)
  // const paginatedUsers = useMemo(() => { ... }, [sortedUsers, currentPage]);

  // TODO: derive totalPages from filteredUsers length
  // const totalPages = ...;

  // TODO: handlers
  // - handleSearchChange
  // - goToNextPage (guard against going past totalPages)
  // - goToPrevPage (guard against going below 1)
  // - handleSort(columnKey) (bonus)

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>User Table</h1>

      {/* Search input */}
      {/* TODO: controlled input bound to `search` */}
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Search by name or email:&nbsp;
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        </label>
      </div>

      {/* Table */}
      <table
        style={style.tableWrap
        }
      >
        <thead>
          <tr>
            {/* TODO (bonus): click handlers for sorting by name/email */}
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Role</th>
          </tr>
        </thead>
        <tbody>
          {/* TODO:
              - render paginatedUsers
              - "No results found" row when list is empty
          */}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        {/* TODO: previous button */}
        {/* TODO: page indicator (e.g., "Page 1 of 3") */}
        {/* TODO: next button */}
      </div>
    </div>
  );
}

const thStyle = {
  borderBottom: "1px solid #ccc",
  textAlign: "left",
  padding: "0.5rem",
  cursor: "pointer"
};

export default function App() {
  return <UserTable />;
}
