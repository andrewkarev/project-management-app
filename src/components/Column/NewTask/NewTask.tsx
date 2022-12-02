import React from 'react';
import styles from './NewTask.module.scss';
import { GoPlus } from 'react-icons/go';
import ITask from 'types/ITask';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'hooks/redux';
import { setSelectedTask } from 'store/reducers/columnSlice';
interface NewTaskProps {
  toggleModal: () => void;
  setModalMode: React.Dispatch<React.SetStateAction<'create' | 'edit'>>;
  // setSelectedTask: React.Dispatch<React.SetStateAction<ITask | null>>;
}

const NewTask: React.FC<NewTaskProps> = ({ toggleModal, setModalMode }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleClick = () => {
    toggleModal();
    setModalMode('create');
    // setSelectedTask(null);
    dispatch(setSelectedTask(null));
  };

  return (
    <div className={styles.newTask} onClick={handleClick}>
      <GoPlus className={styles.newTaskIcon} />
      <p className={styles.newTaskTitle}>{t('addTask')}</p>
    </div>
  );
};

export default NewTask;
