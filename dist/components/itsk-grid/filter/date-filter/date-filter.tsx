import React, {useContext} from 'react';
import {GridColumn} from "../../utils/initialStateTypes";
import {FilterTypeDirectionEnum} from "../../utils/enum/filter-type-direction.enum";
import { gridState } from '../../utils/gridStateTypes';
import {ActionTypes} from '../../utils/actionTypes';
import {ContextGrid} from '../../reducer/reducer';
import {ItskDatePicker} from '../../../itsk-date-picker/itsk-date-picker';

interface DateFilterProps {
  column: GridColumn,
  gridState: gridState | null,
  onFilterChange: (value: string | number,
                   name: string,
                   filterType: number | null | undefined,
                   dispatch: React.Dispatch<ActionTypes>,
                   FilterTypeDirectionEnum: number) => void
}

export const DateFilter: React.FC<DateFilterProps> = ({column, gridState, onFilterChange}) => {
    const {dispatch} = useContext(ContextGrid);
    const columnState = gridState && gridState.dateFilters.find(col => col.name === column.name);

    return (
        <>
            <div className='control__label'>
                <span className='control__label__text'>{column.caption}</span>
            </div>
            <div className="form__group">
                <div className="form__group__row">
                    <ItskDatePicker callback={date =>date && onFilterChange(date.getTime(), column.name, column.filterType, dispatch, FilterTypeDirectionEnum.greaterThan)}
                                    defaultDate={columnState && columnState.value.greaterThan && new Date(columnState.value.greaterThan) || undefined}
                                    activeInputState={columnState && columnState.value.greaterThan? true : false}
                                    canClose={true}
                                    fixed={true}/>
                </div>
                <div className="form__group__row">
                    <ItskDatePicker callback={date =>date && onFilterChange(date.getTime(), column.name, column.filterType, dispatch, FilterTypeDirectionEnum.lessThan)}
                                    defaultDate={columnState && columnState.value.lessThan && new Date(columnState.value.lessThan)|| undefined}
                                    activeInputState={columnState && columnState.value.lessThan? true :false}
                                    canClose={true}
                                    fixed={true}/>
                </div>
            </div>


        </>
    );
};

