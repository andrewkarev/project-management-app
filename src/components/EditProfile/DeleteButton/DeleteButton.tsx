import React, { useState } from 'react';
import styles from './DeleteButton.module.scss';
import { FaTrashAlt } from 'react-icons/fa';
import ConfirmModal from 'components/Modal';
import ConfirmDeleteText from './ConfirmDeleteText';

const DeleteButton = () => {
  const [modalActive, setModalActive] = useState(false);

  return (
    <>
      <div className={styles.wrapper}>
        <button className={styles.deleteBtn} onClick={() => setModalActive(true)}>
          <FaTrashAlt /> DELETE ACCAUNT
        </button>
      </div>
      <ConfirmModal modalActive={modalActive} setModalActive={setModalActive}>
        <ConfirmDeleteText />
      </ConfirmModal>
    </>
  );
};

export default DeleteButton;
