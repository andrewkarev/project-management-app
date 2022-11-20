import React, { useState } from 'react';
import Modal from 'components/Modal';
import styles from './ColumnModal.module.scss';
import InputLineText from 'components/InputLineText';
import { useForm } from 'react-hook-form';
import FormButtons from 'components/FormButtons';
import ValidationErrorMessage from 'components/ValidationErrorMessage';
import { FaListUl } from 'react-icons/fa';
import IColumn from 'types/IColumn';

interface ColumnModalProps {
  modalActive: boolean;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ColumnModal: React.FC<ColumnModalProps> = ({ modalActive, setModalActive }) => {
  const [fileldsValues, setFieldsValues] = useState<Partial<IColumn>>({});

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<Partial<IColumn>>();

  const onSubmit = (data: Partial<IColumn>) => {
    // Do your magic here ...
    console.log(data);
  };

  const onChange = () => {
    const currentFieldsValues = getValues();

    setFieldsValues(currentFieldsValues);
  };

  const onReset = () => {
    setModalActive(false);
    setFieldsValues({
      title: '',
    });
    reset();
  };

  return (
    <Modal modalActive={modalActive} setModalActive={onReset}>
      <div className={styles.elementModal}>
        <div className={styles.titleWrapper}>
          <FaListUl size={25} />
          <h2>Add column</h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} onChange={onChange}>
          <InputLineText
            inputName={'title'}
            label={'Title'}
            placeholder={'Add column heading'}
            register={register}
            fieldValue={fileldsValues.title || ''}
            symbolsLimit={1}
          />
          <ValidationErrorMessage message={errors.title && 'Min 1 symbol'} />
          <FormButtons handleCancelBtnClick={onReset} />
        </form>
      </div>
    </Modal>
  );
};

export default ColumnModal;
