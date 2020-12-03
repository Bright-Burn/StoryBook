import React from 'react';
import {IBaseComponentProps} from '../common';

interface ItskButtonWrapperProps extends IBaseComponentProps{

}

export const ItskButtonWrapper: React.FC<ItskButtonWrapperProps> = ({children}) => {
  return (
    <div className={'button__group'}>
      {children}
    </div>
  );
};

