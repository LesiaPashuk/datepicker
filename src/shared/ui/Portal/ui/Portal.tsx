import { ChangeEvent, MouseEventHandler, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { THEMED } from '@features/calendar/model/constants';

import { PortalPosition, PortalProps } from '../model/types';

import styles from './Portal.module.scss';

const containerCreate = (themed: THEMED) => {
  if (typeof document === 'undefined') return null;
  const div = document.createElement('div');

  div.id = `portal-root-${Math.random()}`;
  div.setAttribute('data-theme', themed);
  div.ariaLabel = 'todo-portal';

  return div;
};

export const Portal = (props: PortalProps) => {
  const [inputValue, setInputValue] = useState('');
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);

  const {
    anchorEl,
    portalRef,
    isOpenPortal,
    onAddTodo,
    onClose,
    selectedDate,
    getTodos,
    onDeleteTodo,
    themed,
  } = props;

  const container = useMemo(() => containerCreate(themed), [themed]);

  const todos = selectedDate ? getTodos(selectedDate) : [];

  useEffect(() => {
    if (!container) return;
    document.body.appendChild(container);

    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  const handleClickInside: MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
  };

  const getPosition = (): PortalPosition => {
    if (!anchorEl) return { top: '', left: '' };

    const { bottom, left } = anchorEl.getBoundingClientRect();

    const buttonWidth = anchorEl.offsetWidth || 0;

    const topPosition = `${bottom + window.scrollY}px`;

    let leftPosition = left + window.scrollX + buttonWidth;

    return {
      top: topPosition,
      left: `${leftPosition}px`,
    };
  };

  const handleAdd = () => {
    if (!inputValue.trim() || !selectedDate) return;

    onAddTodo(selectedDate, inputValue);
    setInputValue('');
  };

  const askDeleteConfirmation = (todo: string) => () => {
    setTodoToDelete(todo);
  };

  const cancelDelete = () => {
    setTodoToDelete(null);
  };

  const confirmDelete = () => {
    if (selectedDate && todoToDelete) {
      onDeleteTodo(selectedDate, todoToDelete);
      setTodoToDelete(null);
    }
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const portalPosition = getPosition();

  if (!isOpenPortal || !container) return null;

  return createPortal(
    <article
      ref={portalRef}
      onClick={handleClickInside}
      className={styles.portal}
      style={{
        position: 'absolute',
        top: portalPosition.top,
        left: portalPosition.left,
      }}
    >
      <div className={styles['header']}>
        <p className={styles['header__title']}>TO DO</p>
        <button className={styles['header__close']} onClick={onClose} aria-label="Close portal">
          ×
        </button>
      </div>
      <div className={styles['input-wrapper']}>
        <input
          className={styles['input-wrapper__input']}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className={styles['input-wrapper__button']} type="button" onClick={handleAdd}>
          Add
        </button>
      </div>
      <div className={styles['todo-list']}>
        {todos?.length === 0 ? (
          <div className={styles['todo-list__empty']}>No tasks yet. Add one!</div>
        ) : (
          todos?.map((todo) => (
            <div key={`todo-item-${todo}`} className={styles['todo-list__item']}>
              {todoToDelete === todo ? (
                <>
                  <span className={styles['todo-list__text']}>Are you sure?</span>
                  <button onClick={confirmDelete} className={styles['todo-list__confirm-yes']}>
                    Yes
                  </button>
                  <button onClick={cancelDelete} className={styles['todo-list__confirm-no']}>
                    No
                  </button>
                </>
              ) : (
                <>
                  {' '}
                  <span className={styles['todo-list__text']}>{todo}</span>
                  <button
                    className={styles['todo-list__delete']}
                    onClick={askDeleteConfirmation(todo)}
                    aria-label="Delete task"
                  >
                    ×
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </article>,
    container
  );
};
