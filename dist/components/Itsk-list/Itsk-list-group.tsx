import React from 'react';
import {IBaseComponentProps} from '../common';

interface ItskListGroupProps extends IBaseComponentProps{

}

export const ItskListGroup: React.FC<ItskListGroupProps> = ({children, style, className}) => {
  return (
    <div className={`list__group ${className}`}
         style={style}>
      {children}
    </div>
  );
};

