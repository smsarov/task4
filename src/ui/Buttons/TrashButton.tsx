import React from 'react';
import styles from './Buttons.module.css';
import TrashIcon from '../../assets/trash.svg';

interface TrashButtonProps {
  onClick?: () => void;
  className?: string;
}

export const TrashButton: React.FC<TrashButtonProps> = ({
  onClick,
  className,
}) => (
  <button
    type="button"
    className={`${styles.trashButton} ${className || ''}`}
    onClick={onClick}
  >
    <img src={TrashIcon} alt="Удалить" className={styles.trashIconSvg} />
  </button>
);
