import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { historyService } from '../../services/historyService';
import type { HistoryRegister } from '../../types/historyRegister';
import { History } from '../../components/History/History';
import { BasicButton } from '../../ui/Buttons/BasicButton';

import style from './HistoryPage.module.css';

export const HistoryPage = () => {
  const [history, setHistory] = useState<HistoryRegister[]>(() =>
    historyService.getAll(),
  );
  const navigate = useNavigate();

  const handleDelete = (index: number) => {
    setHistory(historyService.remove(index));
  };

  const handleDeleteAll = () => {
    historyService.removeAll();
    setHistory([]);
  };

  return (
    <div className={style.container}>
      <History history={history} onDelete={handleDelete} />
      <div className={style.buttons}>
        <BasicButton
          className={style.generate_more}
          onClick={() => navigate('/generate')}
        >
          Сгенерировать больше
        </BasicButton>
        <BasicButton className={style.clear} onClick={handleDeleteAll}>
          Очистить все
        </BasicButton>
      </div>
    </div>
  );
};
