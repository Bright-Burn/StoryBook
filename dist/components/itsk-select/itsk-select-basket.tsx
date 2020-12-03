import React from 'react'
import {ItskPanelsGroup} from '../itsk-layouts/index'
import {ItskIcon} from '../itsk-icon/itskIcon'

interface IItskSelectBasketProps {
  selectedValues: [string | number, any][]
  disabled: boolean
  handleDeleteItem: (deletedValue: any) => void
}

export const ItskSelectBasket: React.FC<IItskSelectBasketProps> = ({selectedValues, disabled, handleDeleteItem}) => {
  return (
    <ItskPanelsGroup className={'padding-t-2 padding-r-2 padding-l-2 padding-b-1 flex-wrap scrollbar'} maxHeight={140}>
      {selectedValues.map((value) => {
        return     <div className="button_secondary margin-r-2 margin-b-1 padding-l-0" key={value[0]}>
                      <div className='padding-2 container align-center'
                           onClick={(event) => {
                             event.stopPropagation();
                             !disabled &&
                             handleDeleteItem(value)
                           }}>
                        <ItskIcon icon={'x-close-outline'} className={'color_secondary'}/>
                      </div>
                      <span className='select__head__text'>{value[0]}</span>
                    </div>

      })}
    </ItskPanelsGroup>
  );
};