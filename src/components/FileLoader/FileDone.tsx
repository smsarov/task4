import { useStore } from '../../stores';
import styles from './FileLoader.module.css';

import { ControlPanel, Message, Content } from '../ControlPanel/ControlPanel';
import { CrossButton } from '../../ui/Buttons/CrossButton';

export const FileDone = () => {
  const file = useStore(state => state.file) as File;
  const clear = useStore(state => state.clear);

  return (
    <ControlPanel
      className={styles.ready}
      contentBlock={
        <Content>
          <div className={`${styles.control_button} ${styles.done_button}`}>
            {file.name}
          </div>
          <CrossButton
            onClick={clear}
            className={styles.control_button}
          ></CrossButton>
        </Content>
      }
      message={<Message>готово!</Message>}
    ></ControlPanel>
  );
};
