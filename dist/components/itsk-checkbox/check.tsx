import * as React from 'react';
import {useEffect, useState} from 'react';
import classNames from 'classnames';
import {IBaseComponentProps} from '../common';
import {ItskIcon} from '../itsk-icon/itskIcon';

export interface ItskCheckProps extends IBaseComponentProps {
  /**
   * компонент неактивен
   */
  disabled: boolean;
  /**
   * true/false или list
   */
  value: any;
  /**
   * Callback для записи значения
   */
  onChange: (any0: any) => void;
  /**
   * true/false
   */
  binary: boolean;

  checked?: boolean
}

export const ItskCheck: React.FC<ItskCheckProps> = ({onChange, disabled, binary, children, value, style, className, checked}) => {


  const [check, setCheck] = useState(checked);

  useEffect(() => {
    setCheck(checked)
  }, [checked]);

  const getValue = () => {
      onChange(value);
  };

  const nullValue = () => {
    onChange(null);
  };

  const changeValue = () => {
    if (disabled) {
      return;
    }
    if (binary) {
      onChange(!check);
      setCheck(!check);
    } else {
      if (check) {
        nullValue();
        setCheck(false);
      } else {
        getValue();
        setCheck(true);
      }
    }
  };

  function handleKeyPress(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (e.key === "Enter") {
      changeValue()
    }
  }

  return (
    <span className={classNames(`checkbox ${className}`,
      {
        'checkbox_disabled': disabled,
      }
    )}
          onClick={changeValue}
          tabIndex={0}
          onKeyDown={handleKeyPress}
          style={style}>
          <ItskIcon icon={'checkbox_marker-check-outline'}
                    className={classNames('icon checkbox__icon color_primary',
            {
              checkbox__icon_checked: check,
              checkbox__icon_unchecked: !check,
            })}/>
          <span className='checkbox__label'>
            {children}
          </span>
        </span>
  );
};
