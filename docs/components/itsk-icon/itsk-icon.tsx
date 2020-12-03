import React from "react";
import {IBaseComponentProps} from "../common";
import classnames from "classnames"

export interface IIcon extends IBaseComponentProps {
  icon: string
}

export const ItskIcon: React.FC<IIcon> = (props) => {
  const {
    style,
    className: propClassName = '',
    icon
  } = props;

  const className = classnames(
    `icon icon-${icon}`,
    {[propClassName]: propClassName},
  );

  return <i className={className} style={style} />;
}