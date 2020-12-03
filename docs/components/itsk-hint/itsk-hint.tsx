import React, {CSSProperties, useMemo, useRef, useState} from 'react';
import {IBaseComponentProps} from '../common';
import {usePortal} from '../../common/util/useCreatePortal'
import ReactDOM from 'react-dom';
import {debounce} from "../../common/util/debounce";

interface ItskHintProps extends IBaseComponentProps {
  hint?: React.ReactNode,
  hintType?: 'default' | 'primary' | 'secondary' | 'ghost' | 'success' | 'warning' | 'info' | 'error' | 'focus',
  delay?: number
}

enum hintTypeEnum {
  default = 'hint__container_default',
  primary = 'hint__container_primary',
  secondary = 'hint__container_secondary',
  ghost = 'hint__container_ghost',
  success = 'hint__container_success',
  warning = 'hint__container_warning',
  error = 'hint__container_error',
  info = 'hint__container_info',
  focus = 'hint__container_focus'
}

export const ItskHint: React.FC<ItskHintProps> = ({
                                                    children,
                                                    hint,
                                                    hintType = 'default',
                                                    className,
                                                    delay= 400
                                                  }) => {
  const [state, setState] = useState(false);
  const portal = usePortal('ItskHint')
  const hintStateRef = useRef<HTMLSpanElement | null>(null);

  const toggleHint = debounce((showHint: boolean) => setState(showHint), delay);

  const {top, left} = hintStateRef.current?.getBoundingClientRect() ?? {
    top: 0,
    left: 0
  };
  const tooltip: CSSProperties = useMemo(() => ({
    position: "absolute",
    zIndex: 1000,
    bottom: window.innerHeight - (top || 0) + 4 - window.scrollY,
    left: (left || 0) + window.scrollX,
  }), [top, left])
  return (
    <span onMouseEnter={() => toggleHint(true)}
          onMouseLeave={() => toggleHint(false)}
          className={className}
          ref={hintStateRef}>
          {children}

      {
        state
        && ReactDOM.createPortal(
          <span style={tooltip} className={`hint__container ${hintTypeEnum[hintType]}`}>{hint}</span>
          , portal)
      }
      </span>

  );
};
