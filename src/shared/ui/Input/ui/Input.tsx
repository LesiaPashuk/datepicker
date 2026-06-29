import { ChangeEvent, useId } from 'react';

import { maskDate } from '../lib/maskDate';
import { MAX_DATE_LENGTH } from '../model/constants';
import { InputProps } from '../model/types';

import { CalendarIcon, CloseIcon } from './assets';
import styles from './Input.module.scss';

export const Input = (props: InputProps) => {
  const { value, placeholder, error, label, handleIsOpen, onClear, onChange } = props;

  const inputId = useId();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const maskedValue = maskDate(e.target.value);

    onChange?.(maskedValue);
  };

  const clearButtonStyles = [styles['wrapper__icon'], !value && styles['wrapper__icon--hidden']]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={inputId} className={styles.wrapper__label}>
          {label}
        </label>
      )}

      <div className={styles['wrapper__input-wrapper']}>
        <button
          type="button"
          onClick={handleIsOpen}
          className={styles.wrapper__icon}
          aria-label="Open calendar"
        >
          <CalendarIcon />
        </button>

        <input
          id={inputId}
          type="text"
          placeholder={placeholder ?? 'Choose Date'}
          value={value}
          className={styles.wrapper__field}
          onChange={handleChange}
          maxLength={MAX_DATE_LENGTH}
        />

        <button
          type="button"
          onClick={onClear}
          className={clearButtonStyles}
          aria-label="Clear input"
        >
          <CloseIcon />
        </button>
      </div>
      {error && <p className={styles.wrapper__error}>{error}</p>}
    </div>
  );
};
