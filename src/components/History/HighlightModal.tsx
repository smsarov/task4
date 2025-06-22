import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CrossButton } from '../../ui/Buttons/CrossButton';
import { uploadService } from '../../services/uploadService';
import type { Highlight } from '../../types/highlight';
import styles from './HighlightModal.module.css';

interface HighlightModalProps {
  highlight: Highlight;
  onClose: () => void;
}

export const HighlightModal = ({ highlight, onClose }: HighlightModalProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    onClose();
  };

  const stats = uploadService.mapHighlightToDisplay(highlight);

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <CrossButton className={styles.close} onClick={handleClose} />
        <div className={styles.statsList}>
          {stats.map(({ label, value }) => (
            <div className={styles.statBlock} key={label}>
              <div className={styles.statValue}>{value}</div>
              <div className={styles.statLabel}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
};
