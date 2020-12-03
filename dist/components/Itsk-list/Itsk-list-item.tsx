import React from 'react';
import {IBaseComponentProps} from '../common';

interface ItskListItemProps extends IBaseComponentProps{
  disabled?: boolean
  onClick?: () => void
}

export const ItskListItem: React.FC<ItskListItemProps> = ({className, style, children, disabled, onClick}) => {
  return (
    <div className={`list__title list__item ${className} ${ disabled? 'list__item_disabled' : null }`}
         style={style} onClick={onClick && onClick}>
      {children}
    </div>
  );
};

