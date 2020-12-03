import React, {useContext} from 'react';
import {GridColumn} from "../../utils/initialStateTypes";
import { gridState } from '../../utils/gridStateTypes';
import {ActionTypes} from '../../utils/actionTypes';
import {ContextGrid} from '../../reducer/reducer';

interface StringFilterProps {
  column: GridColumn,
  gridState: gridState | null,
  onFilterChange: (value: string,
                   name: string,
                   filterType: number | null | undefined,
                   dispatch: React.Dispatch<ActionTypes>,) => void
}

export const StringFilter: React.FC<StringFilterProps> = ({column, gridState, onFilterChange}) => {
  const {dispatch} = useContext(ContextGrid);
    const columnState = gridState === null
      ? undefined
      : gridState.stringFilters.find(col => col.name === column.name);
    return (
        <>
            <label className='control__label'>
                <span className='control__label__text'>{column.caption}</span>
                <input type="text"
                       className='input__field '
                       value={columnState && columnState.value || ''}
                       onChange={event => onFilterChange(event.target.value, column.name, column.filterType, dispatch )}
                />
            </label>
        </>
    );
};

