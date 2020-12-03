import React, {useState} from 'react';
import {IBaseComponentProps} from '../common';

enum Position {
  top = 'tooltip__container_top',
  bottom = 'tooltip__container_bottom',
  right = 'tooltip__container_right',
  left = 'tooltip__container_left'
}

interface ItskTooltipProps extends IBaseComponentProps {
  tooltip: string
  toolTipPosition?: 'bottom' | 'top' | 'right' | 'left',
}

export const ItskTooltip: React.FC<ItskTooltipProps> = ({
                                                          toolTipPosition= 'top',
                                                          children,
                                                          tooltip,
                                                          style,
                                                          className= ''
                                                        }) => {
  const [state, setState] = useState(false);

  return (
    <span style={{position: 'relative', ...style}}
          className={className}>
        <span style={{display: state ? 'inline' : 'none'}}
              className={`tooltip__container ${Position[toolTipPosition]}`}>
          {tooltip}
        </span>
        <span onClick={() => setState(!state)}>
          {children}
        </span>
      </span>
  );
};

