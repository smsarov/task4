import styles from './Spinner.module.css';

export const Spinner = ({
  size = 24,
  strokeWidth = 3,
  color = 'currentColor',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.7;
  const gapLength = circumference - arcLength;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ animation: `${styles.spin} 1s linear infinite` }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={`${arcLength} ${gapLength}`}
        strokeDashoffset="0"
        strokeLinecap="round"
      />
    </svg>
  );
};
