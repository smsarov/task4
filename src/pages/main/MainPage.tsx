import styles from './MainPage.module.css';
import { useStore } from '../../stores';

import { FileUploader } from '../../components/FileLoader/FileLoader';
import { FileError } from '../../components/FileLoader/FileError';
import { FileReady } from '../../components/FileLoader/FileReady';
import { FileStreaming } from '../../components/FileLoader/FileStreaming';
import { StatsObserver } from '../../components/StatsObserver/StatsOberver';
import { FileDone } from '../../components/FileLoader/FileDone';

export const MainPage = () => {
  const status = useStore(state => state.status);

  return (
    <div className={styles.container}>
      <p>
        Загрузите <b>csv</b> файл и получите <b>полную информацию</b> о нем за
        сверхнизкое время
      </p>
      {(() => {
        switch (status) {
          case 'idle':
            return <FileUploader></FileUploader>;
          case 'error':
            return <FileError></FileError>;
          case 'ready':
            return <FileReady></FileReady>;
          case 'streaming':
            return <FileStreaming></FileStreaming>;
          case 'done':
            return <FileDone></FileDone>;
        }
      })()}
      <StatsObserver></StatsObserver>
    </div>
  );
};
