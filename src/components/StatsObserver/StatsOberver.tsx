import { useStore } from '../../stores';
import { Tile } from './Tile';
import styles from './StatsObserver.module.css';
import { uploadService } from '../../services/uploadService';

export const StatsObserver = () => {
  const highlights = useStore(state => state.highlights);

  if (!highlights) {
    return (
      <div className={styles.container}>
        <Placeholder />
      </div>
    );
  }
  const displayStats = uploadService.mapHighlightToDisplay(highlights);

  return (
    <div className={styles.grid}>
      {displayStats.map(({ label, value }) => (
        <Tile key={label} feature={label} value={value} />
      ))}
    </div>
  );
};

const Placeholder = () => (
  <p className={styles.placeholder}>
    Здесь <br /> будут хайлайты
  </p>
);
