import styles from './StatCard.module.css';

const StatCard = ({ label, value, hint }) => (
  <article className={styles.card}>
    <p className={styles.label}>{label}</p>
    <p className={styles.value}>{value}</p>
    <p className={styles.hint}>{hint}</p>
  </article>
);

export default StatCard;
