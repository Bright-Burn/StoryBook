import React, {useMemo, useState} from 'react';
import {ToastContext} from './itsk-toast-notification-context'
import {createPortal} from 'react-dom';
import {Toast} from './toast-notification';
import classNames from 'classnames';
import {ItskAlign} from '../../common/model/itsk-align.enum';
import {ItskVerticalAlign} from '../../common/model/itsk-vertical-align.enum';
import {ItskIconType} from '../itsk-icon/icon-type';

function generateUEID() {
  let first: number | string = (Math.random() * 46656) | 0;
  let second: number | string = (Math.random() * 46656) | 0;
  first = ('000' + first.toString(36)).slice(-3);
  second = ('000' + second.toString(36)).slice(-3);

  return first + second;
}

export type ContentType = JSX.Element | string | number

export type ToastType = {
  content: ContentType
  head: ContentType
  level: number
  id: string
  horizontalAlign: number
  verticalAlign: number
  duration?: number
  icon?: ItskIconType
}

export const withToastProvider = (Component: React.FC) => {
  function WithToastProvider(props:any) {
    const [toasts, setToasts] = useState<ToastType[]>([]);
    const add = (content: ContentType,
                 head: ContentType,
                 level: number,
                 horizontalAlign: number,
                 verticalAlign: number,
                 duration?: number,
                 icon?: ItskIconType) => {
      const id = generateUEID();
      setToasts([...toasts, {id, content, head, level, horizontalAlign, verticalAlign, duration, icon}])
    };
    const remove = (id: string) => setToasts(toasts.filter(toast => toast.id !== id));
    const providerValue = useMemo(() => {return {add}}, [toasts]);
    return (
      <ToastContext.Provider value={providerValue}>
        <Component {...props}/>
        {
          createPortal(
            <div className={classNames(`notification__container`,
              {
                'notification__container_left': toasts[0] && toasts[0].horizontalAlign === ItskAlign.Left,
                'notification__container_center': toasts[0] && toasts[0].horizontalAlign === ItskAlign.Center,
                'notification__container_right': toasts[0] && toasts[0].horizontalAlign === ItskAlign.Right,
                'notification__container_top': toasts[0] && toasts[0].verticalAlign === ItskVerticalAlign.Top,
                'notification__container_middle': toasts[0] && toasts[0].verticalAlign === ItskVerticalAlign.Middle,
                'notification__container_bottom': toasts[0] && toasts[0].verticalAlign === ItskVerticalAlign.Bottom,
              }
            )}>
                {
                  toasts.map(toast => (
                    <Toast key={toast.id}
                           remove={() => remove(toast.id)}
                           text={toast.content}
                           head={toast.head}
                           level={toast.level}
                           duration={toast.duration}
                           icon={toast.icon}/>
                  ))
                }
            </div>,
            document.body
          )
        }
      </ToastContext.Provider>
    )
  }
  return WithToastProvider;
};

