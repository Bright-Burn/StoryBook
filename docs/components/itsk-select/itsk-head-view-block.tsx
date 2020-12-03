import React, {CSSProperties} from 'react';
import {ItskIcon} from '../itsk-icon/itskIcon';

interface ItskHeadViewBlockProps {
  selectedValues: [string | number, any][]
  handleDeleteItem: (value: any) => void
  placeholder: string
  headerClassName: string
  headerStyle?: CSSProperties
  disabled?: boolean
}

export const ItskHeadViewBlock: React.FC<ItskHeadViewBlockProps> = ({selectedValues, disabled, handleDeleteItem, placeholder, headerStyle, headerClassName}) => {
  return (
    <div className={`select__head  select__head_focus ${headerClassName} ${disabled ? 'select_disabled' : ''}`}
         style={headerStyle}>
      {selectedValues.length
        ? <div className='select__values'>
            <div>{`Выбрано - ${selectedValues.length}`}</div>
            <div className={'select__values__list'}>
            {selectedValues.map((value) =>
              <div className=" button_default margin-r-1 margin-b-1 padding-l-0" key={value[0]}>
                  <div className='padding-2 container align-center'
                       onClick={(event) => {
                         event.stopPropagation();
                         !disabled &&
                         handleDeleteItem(value)
                       }}>
                    <ItskIcon icon={'x-close-outline'}/>
                  </div>
                  <span className='select__head__text'>{value[0]}</span>
              </div>)}
            </div>
          </div>
        : <span className='select__head__text'>{placeholder ? placeholder : ''}</span>
      }
      <ItskIcon icon={'triangle-down-arrow-filled'} className={'select__icon icon'}/>
    </div>
  );
};

