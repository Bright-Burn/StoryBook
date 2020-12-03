import React, {useEffect, useState} from 'react';
import {GridColumn} from '../utils/initialStateTypes';
import {gridState} from '../utils/gridStateTypes';
import {GridUtil} from '../utils/util';
import {FilterType} from '../utils/enum/filter-type.enum';
import {NumericFilter} from './numeric-filter/numeric-filter';
import {StringFilter} from './string-filter/string-filter';
import {ListFilter} from './list-filter/list-filter';
import {DateFilter} from './date-filter/date-filter';
import {onChangeFilter, onClearFilter} from './filterUtils';
import { setStateToLocalStorage } from '../utils/loaclStorageFunctions';
import {deepEqual} from '../../../common/util/commonFunctions'
import {ItskIcon} from '../../itsk-icon/itskIcon';

interface ItskGridFilterProps {
  columns: GridColumn[]
  gridState: gridState | null
  gridStateCallback: (arg: gridState) => void
  cookieName?: string
  stateful?: boolean
}

export const ItskGridFilter: React.FC<ItskGridFilterProps> = ({columns, gridState, cookieName, gridStateCallback, stateful = true}) => {
  const flattenColumns = GridUtil.flattenColumns(columns).filter(_ => _.filterable);
  const [state, setState] = useState<gridState | null>(gridState);

  useEffect(() => {
    if(!deepEqual(gridState, state))
    setState(gridState)
  }, [gridState]);

  const onFilterChange = (value: string | number | number[],
                          name: string,
                          filterType: number | null | undefined,
                          _: any,
                          FilterTypeDirectionEnum?: number,
                          equal?: any,
                          ) => {
    if(state)
    setState(onChangeFilter(state, name, filterType, value, FilterTypeDirectionEnum, equal));
  };

  const onSubmit = () => {
    if (state) {
      gridStateCallback(state);
      setStateToLocalStorage(stateful, cookieName, state)
    }
  };
  const onClear = () => {
    if (state) {
      const filteredState = onClearFilter(state, '', null);
      setState(filteredState);
      gridStateCallback(filteredState);
      setStateToLocalStorage(stateful, cookieName, filteredState)
    }
  };

  return (
    <>
      <div className='container align-center height-14 padding-h-8' onWheel={event => event.stopPropagation()}>
        <div className='container container_column container_auto align-end'>
          <button className="button_default"
                  onClick={onClear}>
            <ItskIcon icon={'filter_clear-conus-x-filled'} className={'icon'}/>
          </button>
        </div>
      </div>
      <div className='container container_column container_auto flex-shrink scrollbar'>
        <div className='padding-h-8 margin-b-3'>
          {flattenColumns.map((column)=> {
            if (FilterType.Number === column.filterType )
              return <NumericFilter column={column} gridState={state} onFilterChange={onFilterChange} key={column.caption || column.name}/>;
            else if (FilterType.String === column.filterType)
              return <StringFilter column={column} gridState={state} onFilterChange={onFilterChange} key={column.caption || column.name}/>;
            else if (FilterType.List === column.filterType)
              return <ListFilter column={column} gridState={state} onFilterChange={onFilterChange} key={column.caption || column.name}/>;
            else if (FilterType.Date === column.filterType)
              return <DateFilter column={column} gridState={state} onFilterChange={onFilterChange} key={column.caption || column.name}/>;
            return null
          })}
        </div>
      </div>
      <div className='container align-center height-14 padding-h-8'>
        <div className='container container_column container_auto align-end'>
          <button className="button_default"
                  onClick={onSubmit}>
            Применить
          </button>
        </div>
      </div>
    </>
  );
};

