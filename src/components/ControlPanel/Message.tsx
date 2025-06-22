import styles from './ControlPanel.module.css';

export const Message = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return (
    <span className={`${className ?? ''} ${styles.message}`}>{children}</span>
  );
};
