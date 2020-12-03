import React from 'react';
import {IBaseComponentProps} from '../common';
import {ItskIconType} from '../itsk-icon/icon-type';

interface ItskTabProps extends IBaseComponentProps{
    label: string
    disabled?: boolean
    icon?: ItskIconType
    isActive?: boolean
    IconClassName?: string
}

export const ItskTab: React.FC<ItskTabProps> = ({children}) => {
    return (
        <>
            {children}
        </>
    );
};


