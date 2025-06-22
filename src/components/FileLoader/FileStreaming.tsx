import styles from './FileLoader.module.css';

import { ControlPanel, Message, Content } from '../ControlPanel/ControlPanel';
import { Spinner } from '../../ui/Spinner/Spinner';

export const FileStreaming = () => {
  return (
    <ControlPanel
      className={styles.ready}
      contentBlock={
        <Content>
          <div className={`${styles.control_button} ${styles.spinner_button}`}>
            <Spinner></Spinner>
          </div>
        </Content>
      }
      message={<Message>идет парсинг файла</Message>}
    ></ControlPanel>
  );
};
