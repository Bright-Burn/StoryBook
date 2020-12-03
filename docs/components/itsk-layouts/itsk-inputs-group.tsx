import React from "react";
import {IBaseComponentProps} from "../common";
import classnames from "classnames"

export interface IInputGroups extends IBaseComponentProps {
  caption: string | JSX.Element | JSX.Element[]
  captionClassName?: string
}

export const ItskInputsGroup: React.FC<IInputGroups> = ({children, style, className: inputClassName = '', captionClassName: inputCaptionClassName = '', caption}) => {
  const allStyles = {...style};
  const className = classnames(
    'inputs-group',
    {[inputClassName]: inputClassName},
  );

  const captionClassName = classnames(
    'inputs-group__title',
    {[inputCaptionClassName]: inputCaptionClassName},
  );

  return <div className={className} style={allStyles}>
    <div className={captionClassName}>{caption}</div>
    {children}
  </div>;
}
