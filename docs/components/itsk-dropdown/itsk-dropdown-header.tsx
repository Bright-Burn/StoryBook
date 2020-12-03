import React from 'react';
import {IBaseComponentProps} from "../common";

interface ItskDropdownHeaderProps extends IBaseComponentProps{

}

export const ItskDropdownHeader: React.FC<ItskDropdownHeaderProps> = ({children}) => {
  return (
    <>
      {children}
    </>
  );
};

