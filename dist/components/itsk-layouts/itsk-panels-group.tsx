import React from "react";
import {IBaseComponentProps, IHeightControl, IWidthControl} from "../common";
import classnames from 'classnames'

export interface IPanelsGroupThemes extends IBaseComponentProps, IHeightControl, IWidthControl {
  direction?: 'row' | 'column',
  theme?: 'block-main' | 'block-work'
}

export const ItskPanelsGroup: React.FC<IPanelsGroupThemes> = ({style, theme = '', children, className: inputClassName = '', direction, maxHeight, minHeight, height, maxWidth, minWidth, width}) => {
  const allStyles = {...style, maxHeight, minHeight, height, maxWidth, minWidth, width};
  const className = classnames(
    `container ${theme}`,
    {[inputClassName]: inputClassName},
    {'container_column': direction === 'column'},
  );
  return <div className={className} style={allStyles}>
    {children}
  </div>;
}
