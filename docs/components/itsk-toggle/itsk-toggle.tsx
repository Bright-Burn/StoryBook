import React, {useState} from 'react';
import classNames from "classnames";
import {IBaseComponentProps} from "../common";

export interface ItskToggleProps extends IBaseComponentProps{
  initialValue?: boolean
  disabled?: boolean
  leftLabel?: boolean
  callbackFn: (toggle: boolean) => void
  toggleClassName?: string
  trueColor?: string
  falseColor?: string
}

export const ItskToggle: React.FC<ItskToggleProps> = ({
                                                        initialValue = false,
                                                        leftLabel= false,
                                                        callbackFn,
                                                        toggleClassName= '',
                                                        trueColor = 'orange',
                                                        falseColor = 'white',
                                                        children,
                                                        className= '',
                                                        style,
                                                        disabled = false
                                                      }) => {
  const [toggle, setToggle] = useState(initialValue);
  const handleToggle = () => {
    if (disabled) {
      return
    }
    setToggle(!toggle);
    callbackFn(!toggle)
  };
  return (
    <span className='toggle'
          style={style}
          onClick={handleToggle}>
      {leftLabel
        ? <span className={classNames('toggle__label toggle__label_left')}>{children}</span>
        : null}

      <span className={classNames('toggle__icon',
                        {
                          [className]: className,
                          toggle__icon_checked: toggle,
                        }
                      )}
            style={{background: toggle ? trueColor : falseColor}}>
            <span className={classNames('toggle__icon__circle',
                              {
                                [toggleClassName]: toggleClassName,
                                toggle__icon__circle_checked: toggle,
                                toggle__icon__circle_unchecked: !toggle
                              }
                            )}/>
      </span>

      {leftLabel
        ? null
        : <span className={`toggle__label`}>{children}</span>}

    </span>
  );
};

