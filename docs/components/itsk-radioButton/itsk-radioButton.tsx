import React, {useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import {deepEqual} from '../../common/util/commonFunctions';
import {IBaseComponentProps} from '../common';

interface ItskRadioButtonProps extends IBaseComponentProps{
  /**
   * определяет состояниена момент рендера
   */
  selected?: boolean,
  /**
   * класс применяемый к радиокпоке
   */
  className?: string
  /**
   * value текущей радиокнпки
   */
  value: any,
  /**
   * callback возвращает [value]
   */
  callbackFn: (buttonValue: any[]) => void,
  /**
   * Общий стейт группы радиокнопок model[value]
   */
  model: any[],
  disabled?: boolean
}

export const ItskRadioButton: React.FC<ItskRadioButtonProps> = ({
                                                                  children,
                                                                  value,
                                                                  callbackFn,
                                                                  model,
                                                                  selected = false,
                                                                  className,
                                                                  disabled,
                                                                  style
                                                                }) => {

  const [isSelected, setIsSelected] = useState(false);
  const parentDisabledCheckRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof value === "object"
      ? deepEqual(model[0], value)
      : model.includes(value)) {
      setIsSelected(true)
      return
    }
    setIsSelected(false)
  }, [model, value]);

  useEffect(() => {
    if (selected) {
      setIsSelected(true);
      callbackFn([value]);
    }
  }, []);

  const isButtonChecked = () => {
    if (disabled
      || parentDisabledCheckRef.current
      && parentDisabledCheckRef.current.parentElement
      && parentDisabledCheckRef.current.parentElement.className.includes('radio__button_disabled'))
      return;

    if (typeof value === "object"
      ? deepEqual(model[0], value)
      : model.includes(value)
    ) {
      setIsSelected(false);
      callbackFn([])
    } else {
      callbackFn([value]);
      setIsSelected(true);
    }
  };

  function handleKeyPress(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (e.key === "Enter") {
      isButtonChecked()
    }
  }

  return (
    <div className={classNames('radio__button',
                      {
                          'radio-checked radio-selected': isSelected,
                          className,
                          radio__button_disabled: disabled
                      }
                    )}
         onClick={isButtonChecked}
         tabIndex={0}
         onKeyDown={handleKeyPress}
         ref={parentDisabledCheckRef}
         style={style}>
      <div className="radio__icon">
        {isSelected ? <div className="radio__icon-inner"/> : ''}
      </div>
      {children}
    </div>
  );
};

