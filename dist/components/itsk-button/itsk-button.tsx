import React, {useEffect, useState} from "react";
import {IBaseComponentProps} from "../common";
import classnames from "classnames";
import {ItskIcon} from "../../components/itsk-icon/itskIcon";
import {ItskIconType} from '../itsk-icon/icon-type';

export interface ItskButtonProps extends IBaseComponentProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Тема кнопки
   */
  theme?: 'default' | 'secondary' | 'primary' | 'success' | 'error' | 'warning'
  /**
   * Название иконки, отображаемой слева в input
   */
  leftIcon?: ItskIconType
  /**
   * className для иконки слева
   */
  leftIconClassName?: string
  /**
   * Название иконки, отображаемой справа в input
   */
  rightIcon?: ItskIconType
  /**
   * СlassName для иконки справа
   */
  rightIconClassName?: string
  /**
   * Сallback при нажатии на кнопку
   */
  onClick?: (event?: React.MouseEvent<HTMLElement>, value?: any) => void,
  /**
   * Значение хранимое в кнопке
   */
  value?: any
  /**
   * Состояние кнопки
   */
  disabled?: boolean
}

export const ItskButton: React.FC<ItskButtonProps> = (props) => {
  const {
    children, className: propClassName = '', style,
    theme = 'secondary',
    leftIcon, leftIconClassName = '',
    rightIcon, rightIconClassName = '',
    onClick,
    value,
    disabled,
    ...restProps
  } = props;
  const [btnValue, setBtnValue] = useState(value);

  useEffect(() => {
    setBtnValue(value)
  }, [value]);

    const className = classnames(
        {
            [propClassName]: propClassName,
        },
        `button_${theme} justify-content-center`,
        {
            [`button_${theme}_disabled`]: disabled
        }
    );
  const handleClick = (event: React.MouseEvent<HTMLElement>) => !disabled && onClick && onClick(event, btnValue);

  return <button {...restProps} className={className} style={style} onClick={handleClick}>
    {leftIcon && <ItskIcon icon={leftIcon} className={leftIconClassName} /> }
    {children}
    {rightIcon && <ItskIcon icon={rightIcon} className={rightIconClassName}/> }
  </button>
};
