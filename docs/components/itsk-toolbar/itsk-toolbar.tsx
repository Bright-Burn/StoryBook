import React, {useMemo} from 'react';
import {IBaseComponentProps} from "../common";
import classnames from "classnames";
import {ItskPanel} from "../itsk-layouts/index";


export interface ItskToolbarProps extends IBaseComponentProps {
   rightPanel?: React.ReactNode
   theme?: 'block-main' | 'block-work'
}

export const ItskToolbar: React.FC<ItskToolbarProps> = ({children, className: propClassName = '', style, rightPanel, theme}) => {
  const className = classnames(
    `toolbar ${theme}`,
    {[propClassName]: propClassName},
  );

  const rightPanelContent = useMemo(() => {
    return rightPanel ? <div>{rightPanel}</div> : null;
  }, [rightPanel])

  return <div className={className} style={style}>
    <ItskPanel>
      {children}
    </ItskPanel>
    {rightPanelContent}
  </div>
};

