import styles from './Buttons.module.css';

export const CrossButton = ({
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={`${styles.cross_button} ${className}`} {...rest}>
      <div className={styles.cross}></div>
    </button>
  );
};
