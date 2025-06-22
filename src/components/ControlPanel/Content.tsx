import styles from './ControlPanel.module.css';

export const Content: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className={styles.content_container}>{children}</div>;
};
