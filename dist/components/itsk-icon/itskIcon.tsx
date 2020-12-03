import React from 'react';
import {IBaseComponentProps} from '../common';
import {ItskIconType} from './icon-type';

interface ItskIconProps extends IBaseComponentProps{
  icon: ItskIconType
  onClick?: () => void
}

export const ItskIcon: React.FC<ItskIconProps> = React.memo(({icon, className, style, onClick}) => {
  const defaultStyle = {...style};
  return (
    <svg className={`icon ${className}`} style={defaultStyle} onClick={onClick}>
      <use href={`#icon-${icon}`}/>
    </svg>
  );
});

