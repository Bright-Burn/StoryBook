import React, {useRef} from 'react';
import {IBaseComponentProps} from '../common';
import {ItskIcon} from '../itsk-icon/itskIcon';
import { ItskIconType } from '../itsk-icon/icon-type';
import {ItskCardSeparator} from './itsk-card-separator'
import './itsk-card.css'

type theme = 'default' | 'secondary' | 'primary' | 'ghost' | 'success' | 'warning' | 'error' | 'info' | 'focus'

interface ItskCardProps extends IBaseComponentProps{
  title: React.ReactNode
  rightBlock?: React.ReactNode
  leftIcon?: ItskIconType
  cardSize?: 1|2|3|4|5|6|7|8|9|10|11|12
  titleSize?: 1|2|3
  leftIconClassName?: string
  theme?: 'block-main' | 'block-work'
  titleClassName?: string
  color?: string
  backgroundColor?: theme
  borderColor?: theme
  cardFooter?: React.ReactNode
  footerClassName?: string
  isActive?: boolean
  onClick?: () => void
}

export const ItskCard: React.FC<ItskCardProps> = ({ title,
                                                    children,
                                                    className = '',
                                                    leftIcon,
                                                    style,
                                                    cardSize = '',
                                                    rightBlock,
                                                    titleSize = 2,
                                                    leftIconClassName,
                                                    titleClassName = '',
                                                    theme = '',
                                                    color= '',
                                                    backgroundColor= '',
                                                    borderColor= '',
                                                    cardFooter,
                                                    footerClassName= '',
                                                    isActive = false,
                                                    onClick}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const setActive = () => onClick && onClick();

  return (
    <div className={`card base-shape container_${cardSize} ${className} ${theme} border-color_${borderColor} background-color_${backgroundColor} color_${color} ${isActive? 'base-shape_active' : ''}`}
         style={style}
         ref={cardRef}
         onClick={setActive}>
      <div className={`container align-center justify-content-between margin-b-1`}>
        <div className="container align-baseline overflow-hidden">
        {leftIcon
          && <ItskIcon icon={leftIcon} className={leftIconClassName} />}
          <div className={`font-title${titleSize} context-short ${titleClassName}`}>{title}</div>
        </div>
        {rightBlock
          && rightBlock}
      </div>
      <div className="card-content">
        {children}
      </div>
      {
        cardFooter
        &&  <>
              <ItskCardSeparator/>
              <div className={`container padding-t-3 ${footerClassName}`}>
                {cardFooter}
              </div>
            </>
      }

    </div>
  );
};

