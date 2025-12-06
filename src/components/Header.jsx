import styles from './Header.module.css';

const Header = ({ title, subtitle, timestamp }) => (
  <header className={styles.header}>
    <div>
      <p className={styles.tag}>Starter</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
    <div className={styles.meta}>
      <span className={styles.dot} aria-hidden />
      <span className={styles.metaLabel}>Live</span>
      <span className={styles.timestamp}>{timestamp}</span>
    </div>
  </header>
);

export default Header;
