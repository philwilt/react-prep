import { useState } from 'react';
import Header from './components/Header.jsx';
import StatCard from './components/StatCard.jsx';
import PrimaryButton from './components/PrimaryButton.jsx';
import useClock from './hooks/useClock.js';
import useToggle from './hooks/useToggle.js';
import styles from './App.module.css';
import UserTablePage from './pages/UserTablePage.jsx';

const App = () => {
  const time = useClock();
  const { value: showDetails, toggle } = useToggle(true);
  const [page, setPage] = useState('home');

  if (page === 'users') {
    return <UserTablePage onBack={() => setPage('home')} />;
  }

  return (
    <main className={styles.app}>
      <Header
        title="Prep React 19"
        subtitle="Ready-to-extend React 19 starter with a Vite dev server."
        timestamp={time}
      />

      <section className={styles.content}>
        <div className={styles.actions}>
          <PrimaryButton label={showDetails ? 'Hide details' : 'Show details'} onClick={toggle} />
          <PrimaryButton label="Refresh now" tone="ghost" onClick={() => window.location.reload()} />
          <PrimaryButton label="Open user table" onClick={() => setPage('users')} />
        </div>

        {showDetails && (
          <div className={styles.grid}>
            <StatCard label="React" value="19.2" hint="Configured with JSX entrypoint" />
            <StatCard label="Dev server" value="npm run dev" hint="Vite with fast refresh" />
            <StatCard label="Styling" value="CSS Modules" hint="Scoped component styles" />
            <StatCard label="Structure" value="Components + hooks" hint="Drop in your logic" />
          </div>
        )}
      </section>
    </main>
  );
};

export default App;
