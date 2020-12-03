import React from 'react';
import {IBaseComponentProps} from '../common';

interface ItskListProps extends IBaseComponentProps{

}

export const ItskList: React.FC<ItskListProps> = ({className, style, children}) => {
  return (
    <div className={`list ${className}`}
         style={style}>
      {children}
    </div>
  );
};

