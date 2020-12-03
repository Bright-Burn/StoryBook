import React from 'react';
import classNames from 'classnames';
import {IBaseComponentProps} from '../common';

interface Props extends IBaseComponentProps{
  inline?: boolean
  disabled?: boolean
}

export const ItskRadio: React.FC<Props> = ({inline, children, disabled, className, style}) => {
  return (
    <div className={classNames(`radio ${className || ''}`,
          {
            'radio_inline' : inline,
            'radio__button_disabled' : disabled,
          }
          )}
         style={style}>
      {children}
    </div>
  );
};

