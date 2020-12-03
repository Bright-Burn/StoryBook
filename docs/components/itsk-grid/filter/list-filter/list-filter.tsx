import React, {useContext, useMemo} from 'react';
import {GridColumn} from "../../utils/initialStateTypes";
import {ItskCheckbox} from "../../../itsk-checkbox/itsk-checkbox";
import { gridState } from '../../utils/gridStateTypes';
import {ContextGrid} from '../../reducer/reducer';
import {ActionTypes} from '../../utils/actionTypes';
import {ItskSelect} from '../../../itsk-select/itsk-select';
import {ItskIcon} from '../../../itsk-icon/itskIcon';

interface Props {
  column: GridColumn,
  gridState: gridState | null,
  onFilterChange: (value: any[],
                   name: string,
                   filterType: number | null | undefined,
                   dispatch: React.Dispatch<ActionTypes>,
                   _?: any,
                   equal?: boolean) => void
}

const defaultValue: any[] = [];

export const ListFilter: React.FC<Props> = ({column, gridState, onFilterChange}) => {
    const {dispatch} = useContext(ContextGrid);
    const columnState = useMemo(() => gridState && gridState.listFilters.find(col => col.name === column.name),[gridState]);
    const initialValue = useMemo(() => columnState && column.filterOptions && column.filterOptions.map(option => columnState.value.includes(option.id) && option.id), [columnState && columnState.value])
    return (
        <>
            <div className='control__label control__label_inline container justify-content-between align-center'>
                <span className='control__label__text'>{column.caption}</span>
                <div className='equality padding-h-1 height-4 margin-l-3 background-color_secondary'
                        title={columnState && columnState.type ? `Исключающая выборка` : `Включающая выборка` }
                        onClick={() =>{columnState && onFilterChange(columnState.value, column.name, column.filterType,  dispatch, null, !columnState.type)}}>
                  <ItskIcon icon={columnState && columnState.type ?'equal-line-parallel-outline':'not_equal-line-cross-outline'} className={'icon'}/>
                </div>
            </div>
            <div className="grid-filter__body">
              {column.filterOptions && column.filterOptions.length > 5
                ?  <ItskSelect multiple={true}
                               items={column.filterOptions}
                               valueRef={'id'}
                               textRef={'name'}
                               initialValue={initialValue}
                               selected={true}
                               selectCallback={(value:any[]) => {
                                 columnState && onFilterChange(value, column.name, column.filterType,  dispatch, null, !!columnState.type)
                                }
                               }
                               style={{width: '100%', maxWidth: column.width}}>

                  </ItskSelect>
                : column.filterOptions && column.filterOptions.map((option) =>
                    <ItskCheckbox value={option.id}
                                  binary={false}
                                  disabled={false}
                                  model={columnState && columnState.value || defaultValue}
                                  onChange={(value) =>columnState && onFilterChange(value, column.name, column.filterType,  dispatch, null, !!columnState.type)}
                                  key={option.id}>
                      {option.name}
                    </ItskCheckbox>
                  )
              }

            </div>

        </>
    );
};

