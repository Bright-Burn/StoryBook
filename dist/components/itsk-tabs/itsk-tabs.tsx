import React, {useCallback, useState, Fragment, useMemo} from 'react';
import classNames from "classnames";
import {IBaseComponentProps} from '../common';
import {ItskIcon} from '../itsk-icon/itskIcon';

interface ItskTabsProps extends IBaseComponentProps{
    children: any[],
}

export const ItskTabs: React.FC<ItskTabsProps> = ({children, className, style}) => {

    const initialTab = useMemo(() => {
      const child = children.find(child => child.props.isActive === true) || children[0];
      return child.props.label
    },[]);
    const [activeTab, setActiveTab] = useState<string>(initialTab);
    const handleTab = useCallback((label) => {setActiveTab(label)}, []);

    return (
        <div className={`tabs ${className}`}
             style={style}>
            <div className='tabs__head'>
                {children.map((child) => {
                    const { label, disabled, icon, IconClassName = '' } = child.props;
                    return (
                        <Fragment key={label}>
                        <div className={classNames(`tabs__head__item `, {
                            "tabs__head__item_disabled": disabled,
                            "tabs__head__item_active": label === activeTab && !disabled}
                            )}
                              onClick={() =>disabled ? null : handleTab(label)} >
                            <div className={'container align-center'}>
                              {icon && <ItskIcon icon={icon} className={`icon ${IconClassName}`}/>}
                              <div className='nav-link'>{label}</div>
                            </div>
                        </div>
                        </Fragment>
                    )
                })}
            </div>

            <div className='tabs__content'>
                {children.map((child, index) => {
                    if (child.props.label !== activeTab ) return
                    return (<Fragment key={index+1}>{child}</Fragment>)
                })}
            </div>
    </div>
    )
};
