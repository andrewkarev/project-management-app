import React, { useState } from 'react';
import styles from './UserPreview.module.scss';
import Modal from 'components/Modal';
import ChangeAvatarContent from './ChangeAvatar';
import { avatars } from 'common/constants';

const UserPreview = () => {
  const [modalActive, setModalActive] = useState(false);
  const [avatarsArray, setAvatarArray] = useState(avatars);
  const [currentAvatar, setCurrentAvatar] = useState(avatars[0]);
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.avatrWrapper}>
          <img src={currentAvatar.src} width={120} alt={`User image-${currentAvatar.id}`} />
          <button className={styles.avatarButon} type="button" onClick={() => setModalActive(true)}>
            Change avatar
          </button>
        </div>
        <div className={styles.nameWrapper}>
          <p className={styles.description}>
            Name: <span className={styles.value}>RegName</span>
          </p>
          <p className={styles.description}>
            Login: <span className={styles.value}>RegLogin</span>
          </p>
        </div>
      </div>
      <Modal modalActive={modalActive} setModalActive={setModalActive}>
        <ChangeAvatarContent
          setModalActive={setModalActive}
          currentAvatar={currentAvatar}
          setCurrentAvatar={setCurrentAvatar}
          avatarsArray={avatarsArray}
          setAvatarArray={setAvatarArray}
        />
      </Modal>
    </>
  );
};

export default UserPreview;
