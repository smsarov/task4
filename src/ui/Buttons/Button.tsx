import React from 'react';
import type { ReactNode } from 'react';
import styles from './ColoredButtons.module.css';

export type ButtonColor =
  | 'white'
  | 'purple'
  | 'orange'
  | 'light-green'
  | 'dark-green';

export type ButtonRounded = 's' | 'm';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  rounded?: ButtonRounded;
  className?: string;
  children?: ReactNode;
}

export const Button = ({
  color,
  rounded,
  className = '',
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`
        ${styles.basic_button}
        ${color ? styles[color] : ''}
        ${rounded ? styles[rounded] : ''}
        ${className}
      `}
      {...rest}
    >
      {children}
    </button>
  );
};
