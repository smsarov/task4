import type { HistoryRegister } from '../../types/historyRegister';
import { Row } from './Row';
import styles from './History.module.css';
import { useState } from 'react';
import { HighlightModal } from './HighlightModal';

interface HistoryProps {
  history: HistoryRegister[];
  onDelete: (index: number) => void;
}

export const History = ({ history, onDelete }: HistoryProps) => {
  const [modalIdx, setModalIdx] = useState<number | null>(null);

  return (
    <div className={styles.gridBody}>
      {history.map((item, idx) => (
        <Row
          key={item.fileName + item.date}
          item={item}
          onDelete={() => onDelete(idx)}
          onClick={
            item.success && item.highlight ? () => setModalIdx(idx) : undefined
          }
        />
      ))}
      {modalIdx !== null && history[modalIdx]?.highlight && (
        <HighlightModal
          highlight={history[modalIdx].highlight}
          onClose={() => setModalIdx(null)}
        />
      )}
    </div>
  );
};
