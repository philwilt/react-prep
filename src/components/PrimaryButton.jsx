import clsx from '../utils/clsx.js';
import styles from './PrimaryButton.module.css';

const PrimaryButton = ({ label, onClick, tone = 'solid' }) => {
  const className = clsx(styles.button, tone === 'ghost' && styles.ghost);

  return (
    <button type="button" className={className} onClick={onClick}>
      {label}
    </button>
  );
};

export default PrimaryButton;
