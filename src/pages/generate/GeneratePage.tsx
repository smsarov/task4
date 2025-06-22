import { useEffect } from 'react';
import { BasicButton } from '../../ui/Buttons/BasicButton';
import { Spinner } from '../../ui/Spinner/Spinner';
import { useReportGenerator } from '../../hooks/useReportGenerator.ts';
import {
  ControlPanel,
  Content,
  Message,
} from '../../components/ControlPanel/ControlPanel';
import { CrossButton } from '../../ui/Buttons/CrossButton.tsx';
import styles from './GeneratePage.module.css';
import { downloadService } from '../../services/downloadService';

function IdleContent({ onGenerate }: { onGenerate: () => void }) {
  return (
    <Content>
      <BasicButton
        className={`${styles.control_button} ${styles.generate_button}`}
        onClick={onGenerate}
      >
        Начать генерацию
      </BasicButton>
    </Content>
  );
}

function GeneratingContent() {
  return (
    <Content>
      <BasicButton
        className={`${styles.control_button} ${styles.spinner_button}`}
      >
        <Spinner />
      </BasicButton>
    </Content>
  );
}

function DoneContent({ onReset }: { onReset: () => void }) {
  return (
    <Content>
      <BasicButton
        className={`${styles.control_button} ${styles.ready_button}`}
      >
        Done!
      </BasicButton>
      <CrossButton onClick={onReset} />
    </Content>
  );
}

function ErrorContent({ onReset }: { onReset: () => void }) {
  return (
    <Content>
      <BasicButton
        className={`${styles.control_button} ${styles.error_button}`}
      >
        Ошибка
      </BasicButton>
      <CrossButton onClick={onReset} />
    </Content>
  );
}

export const GeneratePage = () => {
  const { status, error, reportBlob, generateReport, reset } =
    useReportGenerator();

  useEffect(() => {
    if (status === 'done' && reportBlob) {
      downloadService.triggerDownload(reportBlob, 'report.csv');
    }
  }, [status, reportBlob]);

  let contentBlock: React.ReactElement<typeof Content> = (
    <Content>{<></>}</Content>
  );
  let messageBlock: React.ReactElement<typeof Message> = (
    <Message>{''}</Message>
  );

  switch (status) {
    case 'idle':
      contentBlock = <IdleContent onGenerate={generateReport} />;
      break;
    case 'generating':
      contentBlock = <GeneratingContent />;
      messageBlock = <Message>идет процесс генерации</Message>;
      break;
    case 'done':
      contentBlock = <DoneContent onReset={reset} />;
      messageBlock = <Message>файл сгенерирован</Message>;
      break;
    case 'error':
      contentBlock = <ErrorContent onReset={reset} />;
      messageBlock = <Message className="">{error || 'Ошибка'}</Message>;
      break;
    default:
      break;
  }

  return (
    <div className={styles.container}>
      <p>Сгенерируйте готовый csv-файл нажатием одной кнопки</p>
      <ControlPanel contentBlock={contentBlock} message={messageBlock} />
    </div>
  );
};
