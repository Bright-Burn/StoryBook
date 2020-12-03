import React, {useContext} from 'react';
import {GridColumn} from "../../utils/initialStateTypes";
import { FilterTypeDirectionEnum } from '../../utils/enum/filter-type-direction.enum';
import {gridState} from '../../utils/gridStateTypes';
import {ActionTypes} from '../../utils/actionTypes';
import {ContextGrid} from '../../reducer/reducer';
import { ItskIcon } from '../../../itsk-icon/itskIcon';

interface NumericFilterProps {
    column: GridColumn,
    gridState: gridState | null,
    onFilterChange: (value: string,
                     name: string,
                     filterType: number | null | undefined,
                     dispatch: React.Dispatch<ActionTypes>,
                     FilterTypeDirectionEnum: number) => void
}

export const NumericFilter: React.FC<NumericFilterProps> = ({column, gridState, onFilterChange}) => {
    const columnState = gridState && gridState.numericFilters.find(col => col.name === column.name);
    const {dispatch} = useContext(ContextGrid);

    return (
        <>
            <div className='control__label'>
                <span className='control__label__text'>{column.caption}</span>
            </div>

            <div className="input">
                <ItskIcon icon={'less-left-chevron-arrow-outline'} className={'icon input__icon input__icon-left'}/>
                <label className='input__label'>
                    <input type="text"
                           className='input__field input__field_icon_left'
                           value={columnState && columnState.value.greaterThan || ''}
                           onChange={event => onFilterChange(event.target.value, column.name, column.filterType, dispatch, FilterTypeDirectionEnum.greaterThan)
                           } />
                </label>
            </div>

            <div className="input">
                <ItskIcon icon={'more-right-chevron-arrow-outline'} className={'icon input__icon input__icon-left'}/>
                <label className='input__label'>
                    <input type="text"
                           className='input__field input__field_icon_left'
                           value={columnState && columnState.value.lessThan || ''}
                           onChange={event => onFilterChange(event.target.value, column.name, column.filterType, dispatch, FilterTypeDirectionEnum.lessThan)
                           } />
                </label>
            </div>

            <div className="input">
                <ItskIcon icon={'equal-line-parallel-outline'} className={'icon input__icon input__icon-left'}/>
                <label className='input__label'>
                    <input type="text"
                           className='input__field input__field_icon_left'
                           value={columnState && columnState.value.equalsTo || ''}
                           onChange={event => onFilterChange(event.target.value, column.name, column.filterType, dispatch, FilterTypeDirectionEnum.equal)
                           }/>
                </label>
            </div>

        </>
    );
};

