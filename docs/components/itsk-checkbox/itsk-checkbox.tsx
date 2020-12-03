import * as React from 'react';
import {useEffect, useState} from 'react';
import classNames from 'classnames';
import {IBaseComponentProps} from '../common';
import {ItskIcon} from '../itsk-icon/itskIcon';

export interface ItskCheckboxProps extends IBaseComponentProps {
  /**
   * компонент неактивен
   */
  disabled?: boolean;
  /**
   * true/false или list
   */
  value: any;
  /**
   * Callback для записи значения
   */
  onChange: (any0: any[]) => void;
  /**
   * true/false
   */
  binary?: boolean;
  /**
   * Значение
   */
  model?: any[];

}
const defaultValue: any[] = [];

export const ItskCheckbox: React.FC<ItskCheckboxProps> = ({ onChange,
                                                            disabled,
                                                            binary= false,
                                                            model,
                                                            children,
                                                            value,
                                                            style,
                                                            className = ''}) => {

  const [stateModel, setStateModel] = useState(model || []);
  const isChecked = (): boolean => {
    return stateModel && stateModel.includes(value);
  };
  const [check, setCheck] = useState({checked: isChecked()});

  useEffect(() => {
    if (model === stateModel) {
      setCheck({checked: model.includes(value)});
      return
    }
    setStateModel(model || defaultValue);
    setCheck({checked: model? model.includes(value) : false})
  }, [model]);


  const addValue = () => {
    if (stateModel && stateModel[0] !== false && stateModel[0] !== true && model) {
      onChange([...model, value]);
      setStateModel([...model, value])
    } else {
      onChange([value]);
      setStateModel([value])
    }
  };

  const removeValue = () => {
    setStateModel(stateModel.filter((val: any) => val !== value));
    onChange(stateModel.filter((val: any) => val !== value));
  };

  const changeValue = () => {
    if (disabled) {
      return;
    }
    if (binary) {
      onChange([!stateModel[0]]);
      setStateModel([!stateModel[0]]);
      setCheck({
        checked: !stateModel[0]
      });
    } else {
      if (isChecked()) {
        removeValue();
        setCheck({
          checked: false
        });
      } else {
        addValue();
        setCheck({
          checked: true
        });
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
                className={classNames('icon checkbox__icon icon-check color_primary',
        {
          checkbox__icon_checked: check.checked,
          checkbox__icon_unchecked: !check.checked,
        })}/>
      <span className='checkbox__label '>
        {children}
      </span>
    </span>
  );
};
