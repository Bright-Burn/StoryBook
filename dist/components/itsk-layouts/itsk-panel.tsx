import * as React from "react";
import {IBaseComponentProps, IFlexControl} from "../common";
import classnames from 'classnames'

export interface IPanelThemes extends IBaseComponentProps, IFlexControl {
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}

export const ItskPanel: React.FC<IPanelThemes> = ({children, style, className: inputClassName = 0, flexBasis, flexShrink, flexGrow, size = 'auto'}) => {
  const allStyles = {...style, flexBasis, flexShrink, flexGrow};
  const className = classnames(
    {[`${inputClassName}`]: inputClassName},
    `container_${size}`,
  );
  return <div className={className} style={allStyles}>
    {children}
  </div>;
}
