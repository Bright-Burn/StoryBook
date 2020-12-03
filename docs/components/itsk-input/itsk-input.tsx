import React, {useState, useCallback} from "react";
import { IBaseComponentProps } from "../common";
import {ItskIcon} from "../../components/itsk-icon/itskIcon";
import classnames from "classnames";
import {ItskIconType} from '../itsk-icon/icon-type';

export type inputValue = string | number;

export interface IInput extends IBaseComponentProps, React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
  leftIcon?: ItskIconType
  leftIconClassName?: string
  rightIcon?: ItskIconType
  rightIconClassName?: string
  helper?: string
  inputClassName?: string
  onInputChange?: (value: inputValue, oldValue?: inputValue, event?: React.ChangeEvent) => void
  onValidate?: (event: React.ChangeEvent<HTMLInputElement>) => boolean
  initValue?: inputValue
  obligate?: boolean
  disabled?: boolean
}

export const ItskInput: React.FC<IInput> = (props) => {
  const {
    style,
    className: propClassName = '',
    inputClassName: propInputClassName = '',
    placeholder,
    leftIcon, leftIconClassName = '',
    rightIcon, rightIconClassName = '',
    helper,
    onInputChange,
    onValidate,
    initValue = '',
    obligate,
    disabled,
    value,
    ...restProps
  } = props;

  const className = classnames(
    'input',
    {'input_optional': obligate},
    {[propClassName]: propClassName},
  );

  const inputClassName = classnames(
    'input__field',
    {[propInputClassName]: propInputClassName},
  );

  const [inputValue, setInputValue] = useState<string | number>(initValue);

  const handleOnChange = useCallback(event => {
    if (onValidate && !onValidate(event))
      return
    if (!!onInputChange) {
      onInputChange(event.target.value, inputValue, event);
    }
    setInputValue(event.target.value);
  }, [onInputChange, onValidate]);

  return <div className={className} style={style}>
    {leftIcon && <ItskIcon icon={leftIcon} className={`input__icon input__icon-left ${leftIconClassName}`} /> }
    {rightIcon && <ItskIcon icon={rightIcon} className={`input__icon input__icon-right ${rightIconClassName}`}/> }
    <input {...restProps} className={inputClassName} placeholder={placeholder} onChange={handleOnChange} value={value || inputValue} disabled={disabled}/>
    <div className="input__helper">{helper}</div>
  </div>
}
