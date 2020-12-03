import React, {useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import {ItskNotificationLevel} from './itsk-notification.enum';
import { ContentType } from './itsk-toast-notification-provider';
import {IBaseComponentProps} from '../common';
import {ItskIcon} from '../itsk-icon/itskIcon';
import { ItskIconType } from '../itsk-icon/icon-type';

interface ToastProps extends IBaseComponentProps{
  remove: () => void
  head: ContentType
  text: ContentType
  level: number
  duration?: number
  icon?: ItskIconType
}

export const Toast: React.FC<ToastProps> = ({remove, head, text, level, className, duration, icon}) => {
  const removeRef = useRef<() => void | undefined>();
  const [resetDuration, setResetDuration] = useState(false);

  removeRef.current = remove;
  let id: any;
  useEffect(() => {
    const timeoutDuration = duration || 5000;
    id = setTimeout(() => removeRef.current && removeRef.current(), timeoutDuration);

    return () => clearTimeout(id)
  },[resetDuration]);

  return (
    <div className={classNames(`notification`,
      {
        className: className,
        'base-shape_info': level === ItskNotificationLevel.Info,
        'base-shape_success': level === ItskNotificationLevel.Success,
        'base-shape_warning': level === ItskNotificationLevel.Warn,
        'base-shape_error ': level === ItskNotificationLevel.Error
      }
    )}
         onMouseEnter={() => clearTimeout(id)}
         onMouseLeave={() => setResetDuration(!resetDuration)}>

        <div className="container align-center justify-content-between">
          <div className={'container overflow-hidden"'}>
            <ItskIcon icon={icon || `new-document-sheet-filled`} className={' margin-r-2'}/>
            <div className={'font-title2 text-short'}>
              {head}
            </div>
          </div>
          <ItskIcon icon={'x-close-outline'} className={'icon cursor_pointer'} onClick={remove}/>
        </div>

        <div className="notification-item__content__text">
          {text}
        </div>

    </div>
  );
};

