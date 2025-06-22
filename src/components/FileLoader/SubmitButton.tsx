import styles from './FileLoader.module.css';
import { useStore } from '../../stores';
import { BasicButton } from '../../ui/Buttons/BasicButton';

export const SubmitButton = ({ disabled }: { disabled: boolean }) => {
  const sendFile = useStore(state => state.sendFile);

  return (
    <BasicButton
      onClick={sendFile}
      disabled={disabled}
      className={`${styles.submit_button} ${styles.control_button}`}
    >
      Отправить
    </BasicButton>
  );
};
