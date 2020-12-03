import React from 'react';
import {ContentType} from './itsk-toast-notification-provider';
import {ItskIconType} from '../itsk-icon/icon-type';
type initStateType = {
  add: (content: ContentType,
        head: ContentType,
        level: number,
        horizontalAlign: number,
        verticalAlign: number,
        duration?: number,
        icon?: ItskIconType) => void
}
const initState:initStateType = {add: () => {}};
export const ToastContext = React.createContext<initStateType>(initState);

