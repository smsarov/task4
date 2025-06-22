import { useState } from 'react';
import { useStore } from '../../stores';
import styles from './FileLoader.module.css';

import { ControlPanel, Message, Content } from '../ControlPanel/ControlPanel';
import { SubmitButton } from './SubmitButton';

export const FileUploader = () => {
  const [isHovering, setIsHovering] = useState(false);
  const setFile = useStore(state => state.setFile);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsHovering(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsHovering(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setIsHovering(false);
      setFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFile(file);
  };

  return (
    <>
      <ControlPanel
        className={` ${isHovering ? styles.hovering : styles.uploader}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        contentBlock={
          <Content>
            <label
              htmlFor="file-input"
              className={`${styles.control_button} ${styles.upload_button}`}
              role="button"
            >
              Загрузить файл
            </label>
            <input
              type="file"
              accept=".csv"
              hidden
              id="file-input"
              onChange={handleFileInput}
            />
          </Content>
        }
        message={<Message>или перетащите сюда</Message>}
      ></ControlPanel>
      <SubmitButton disabled={true}></SubmitButton>
    </>
  );
};
