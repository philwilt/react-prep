import { useEffect, useMemo, useState } from 'react';
import PrimaryButton from '../components/PrimaryButton.jsx';
import styles from './UserTablePage.module.css';

const USERS = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor' },
  { id: 3, name: 'Carol Lee', email: 'carol@example.com', role: 'Viewer' },
  { id: 4, name: 'David Kim', email: 'david@example.com', role: 'Viewer' },
  { id: 5, name: 'Eve Chan', email: 'eve@example.com', role: 'Editor' },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Viewer' },
  { id: 7, name: 'Grace Brown', email: 'grace@example.com', role: 'Admin' },
  { id: 8, name: 'Henry Wilson', email: 'henry@example.com', role: 'Viewer' },
  { id: 9, name: 'Ivy Davis', email: 'ivy@example.com', role: 'Editor' },
  { id: 10, name: 'Jack Taylor', email: 'jack@example.com', role: 'Viewer' }
];

const PAGE_SIZE = 5;

const sortValue = (user, key) => user[key].toLowerCase();

const UserTablePage = ({ onBack }) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => setCurrentPage(1), [search]);

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return USERS;
    return USERS.filter(
      ({ name, email }) =>
        name.toLowerCase().includes(term) || email.toLowerCase().includes(term)
    );
  }, [search]);

  const sortedUsers = useMemo(() => {
    if (!sortConfig.key) return filteredUsers;
    const sorted = [...filteredUsers].sort((a, b) => {
      const left = sortValue(a, sortConfig.key);
      const right = sortValue(b, sortConfig.key);
      if (left === right) return 0;
      return left > right ? 1 : -1;
    });
    return sortConfig.direction === 'asc' ? sorted : sorted.reverse();
  }, [filteredUsers, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedUsers.slice(start, start + PAGE_SIZE);
  }, [sortedUsers, currentPage]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
    setCurrentPage(1);
  };

  const goToPrevPage = () => setCurrentPage((page) => Math.max(1, page - 1));
  const goToNextPage = () => setCurrentPage((page) => Math.min(totalPages, page + 1));

  const renderSort = (key) => {
    if (sortConfig.key !== key) return <span className={styles.sortMuted}>--</span>;
    return sortConfig.direction === 'asc' ? 'ASC' : 'DESC';
  };

  return (
    <main className={styles.page}>
      <div className={styles.head}>
        <div>
          <p className={styles.kicker}>Users</p>
          <h1 className={styles.title}>User Table</h1>
          <p className={styles.subtitle}>Search, sort, and paginate sample data.</p>
        </div>
        <PrimaryButton label="Back to home" tone="ghost" onClick={onBack} />
      </div>

      <div className={styles.searchRow}>
        <label className={styles.searchLabel}>
          Search by name or email
          <input
            className={styles.searchInput}
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Type to filter…"
          />
        </label>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th} onClick={() => handleSort('name')}>
                Name <span className={styles.sort}>{renderSort('name')}</span>
              </th>
              <th className={styles.th} onClick={() => handleSort('email')}>
                Email <span className={styles.sort}>{renderSort('email')}</span>
              </th>
              <th className={styles.th}>Role</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length === 0 && (
              <tr>
                <td className={styles.empty} colSpan={3}>
                  No results found.
                </td>
              </tr>
            )}
            {paginatedUsers.map((user) => (
              <tr key={user.id}>
                <td className={styles.td}>{user.name}</td>
                <td className={styles.td}>{user.email}</td>
                <td className={styles.td}>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <button className={styles.pageButton} onClick={goToPrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span className={styles.pageIndicator}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={styles.pageButton}
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default UserTablePage;
