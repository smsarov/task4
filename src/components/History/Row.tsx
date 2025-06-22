import type { HistoryRegister } from '../../types/historyRegister';
import { TrashButton } from '../../ui/Buttons/TrashButton';
import FileIcon from '../../assets/file.svg';
import styles from './History.module.css';

interface RowProps {
  item: HistoryRegister;
  onDelete: () => void;
  onClick?: () => void;
}

export const Row = ({ item, onDelete, onClick }: RowProps) => {
  return (
    <div className={styles.rowWrapper}>
      <div
        className={styles.gridRow}
        onClick={onClick}
        tabIndex={0}
        role="button"
      >
        <div className={styles.fileField}>
          <img src={FileIcon} alt="file" className={styles.fileIcon} />
          <span className={styles.fileName}>{item.fileName}</span>
        </div>
        <div className={styles.date}>{formatDate(item.date)}</div>
        <div className={styles.statusBlock}>
          <span className={item.success ? styles.normal : styles.dimmed}>
            Обработан успешно{' '}
            <span role="img" aria-label="success">
              😊
            </span>
          </span>
          <span className={!item.success ? styles.normal : styles.dimmed}>
            Не удалось обработать{' '}
            <span role="img" aria-label="fail">
              😞
            </span>
          </span>
        </div>
      </div>
      <TrashButton onClick={onDelete} />
    </div>
  );
};

function formatDate(dateNum: number) {
  const date = new Date(dateNum);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}
