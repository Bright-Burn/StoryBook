import React from 'react';
import {IBaseComponentProps} from "../common";

interface ItskDropdownContentProps extends IBaseComponentProps{

}

export const ItskDropdownContent: React.FC<ItskDropdownContentProps> = ({children}) => {
  return (
    <>
      {children}
    </>
  );
};

