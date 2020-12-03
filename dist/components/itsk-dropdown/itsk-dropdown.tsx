import React, {useEffect, useMemo, useRef, useState} from 'react';
import classNames from 'classnames';
import useWindowDimensions from "../helpers/useWindowDimensions";
import {IBaseComponentProps} from '../common';

interface ItskDropdownProps extends IBaseComponentProps {
  canClose: boolean
  fixed: boolean
  callback?: (arg: boolean) => void
  changeToggleState?: boolean
  align?: 'right' | 'left'
  disabled?: boolean,
  border?: string
}

export const ItskDropdown: React.FC<ItskDropdownProps> = ({
                                                            children,
                                                            fixed,
                                                            align,
                                                            callback,
                                                            canClose,
                                                            changeToggleState,
                                                            disabled = false,
                                                            border,
                                                            className= '',
                                                            style
                                                          }) => {
  const [toggle, setToggle] = useState(false);
  const dropDownParent = useRef<HTMLDivElement | null>(null);
  const dropDownElement = useRef(null);
  const {innerHeight} = useWindowDimensions();

  // useEffect(() => {
  //   if (dropDownParent.current)
  //     dropDownParent.current.addEventListener('wheel', event => {
  //       event.preventDefault();
  //     })
  // }, []);

  useEffect(() => {
    const body = document.body;
    body.addEventListener('mousedown', handleToggleClick);
    return () => body.removeEventListener('mousedown', handleToggleClick)
  }, [toggle]);

  useEffect(() => {
    const body = document.body;
    body.addEventListener('wheel', handleToggleClick);
    return () => body.removeEventListener('wheel', handleToggleClick)
  }, [toggle]);

  const handleToggleClick = (event: MouseEvent) => {
    if (toggle) {
      const targetNode = event.target;
      if (dropDownParent.current && targetNode instanceof Node && !dropDownParent.current.contains(targetNode)) {
        setToggle(false);
        if (callback)
          callback(false)
      }
    }
  };

  const findTransformedParent = (node: HTMLElement | null) => {
    while (node !== null && node.tagName !== 'BODY') {
      const style = getComputedStyle(node);
      if (style.transform !== 'none') {
        return node;
      }
      node = node.parentNode as HTMLElement;
    }
    return null;
  };
  const getPosition = useMemo( () => {
    if (toggle && fixed && dropDownParent.current) {
      const parent = dropDownParent.current && dropDownParent.current.getBoundingClientRect();
      const transformedParent = findTransformedParent(dropDownParent.current);
      if (transformedParent) {
        const transformedParentPosition = transformedParent.getBoundingClientRect();
        if (innerHeight && innerHeight - parent.bottom < 300) {
          return {
            bottom: (transformedParentPosition.bottom - parent.top + 'px'),
            left: (parent.left - transformedParentPosition.left + 'px'),
            minWidth: (parent.width + 'px'),
            border: border && border
          }
        }
        return {
          top: (parent.top + parent.height - transformedParentPosition.top + 'px'),
          left: (parent.left - transformedParentPosition.left + 'px'),
          minWidth: (parent.width + 'px'),
          border: border && border
        }
      } else {

        if (innerHeight && innerHeight - parent.bottom < 300) {
          return {
            bottom: (innerHeight - parent.top + 'px'),
            left: (parent.left + 'px'),
            minWidth: (parent.width + 'px'),
            border: border && border
          }
        }
        return {
          top: (parent.top + parent.height + 'px'),
          left: (parent.left + 'px'),
          minWidth: (parent.width + 'px'),
          border: border && border
        }
      }

    }
    return
  },[toggle]);

  const dropDownToggle = () => {
    if (canClose && !disabled) {
      setToggle(!toggle);
      if (callback)
        callback(!toggle)
    } else if (!disabled) {
      setToggle(true);
      if (callback)
        callback(true)
    }
  };
  const onClickEsc = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === ('Escape' || 'Esc')) {
      setToggle(false);
      if (callback)
        callback(false)
    }
  };
  const onContentClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    if (changeToggleState) {
      setToggle(false)
      callback && callback(false)
    }
  }
  return (
    <div ref={dropDownParent}
         className={`dropdown ${className}`}
         onClick={dropDownToggle}
         onKeyDown={onClickEsc}
         style={style}>
      <div className='dropdown__head'>
        {children ? children[0] : null}
      </div>
      {toggle
        ? <div className={classNames(
         'dropdown__content', {
                  'dropdown__content-absolute': !fixed,
                  'dropdown__content_right': align === 'right',
                  'dropdown__content-fixed': fixed
                  }
                )}
               ref={dropDownElement}
               onClick={onContentClick}
               style={getPosition}>
            {children ? children[1] : null}
          </div>
        : null
      }

    </div>
  );
};

