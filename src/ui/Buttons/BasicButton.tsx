import styles from './Buttons.module.css';

export const BasicButton = ({
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`${styles.basic_button} ${className}`}
      {...rest}
    ></button>
  );
};
