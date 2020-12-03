import React, {CSSProperties, useMemo} from 'react';
import {ItskIcon} from '../itsk-icon/itskIcon';

interface ItskSelectHeadStringProps {
  selectedValues: [string | number, any][]
  placeholder: string
  headerClassName: string
  headerStyle?: CSSProperties
  disabled?: boolean
}

export const ItskSelectHeadString: React.FC<ItskSelectHeadStringProps> = ({selectedValues, disabled, placeholder, headerClassName, headerStyle}) => {
  const selectedList = useMemo(() => selectedValues.map(value => value[0]), [selectedValues])
  return (
    <div className={`select__head ${headerClassName} ${disabled ? 'select_disabled' : ''} `}
         style={{display: "block", ...headerStyle}}>
      {
        selectedValues.length
          ?  selectedList.join(', ')
          :  <span className='select__head__text'>{placeholder ? placeholder : ''}</span>
      }
        <ItskIcon icon={'triangle-down-arrow-filled'} className={'select__icon padding-l-1'}/>
    </div>
  );
};

