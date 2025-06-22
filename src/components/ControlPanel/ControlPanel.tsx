import styles from './ControlPanel.module.css';
import { Message } from './Message';
import { Content } from './Content';
import type { ReactElement } from 'react';

export const ControlPanel = ({
  contentBlock,
  message,
  className,
  ...rest
}: {
  contentBlock: ReactElement<typeof Content>;
  message?: ReactElement<typeof Message>;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`${className ?? ''} ${styles.background}`} {...rest}>
      {contentBlock}
      {message}
    </div>
  );
};

export { Message, Content };
