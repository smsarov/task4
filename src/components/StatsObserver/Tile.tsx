import styles from './StatsObserver.module.css';

export const Tile = ({
  feature,
  value,
}: {
  feature: string;
  value: React.ReactNode;
}) => {
  return (
    <div className={styles.tile}>
      <p>{value}</p>
      <span>{feature}</span>
    </div>
  );
};
