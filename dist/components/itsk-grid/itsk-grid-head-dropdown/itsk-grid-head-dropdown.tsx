import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {ItskTabs} from "../../itsk-tabs/itsk-tabs";
import {ItskTab} from "../../itsk-tabs/itsk-tab";
import {FilterType} from "../utils/enum/filter-type.enum";
import {NumericFilter} from "../filter/numeric-filter/numeric-filter";
import {GridColumn} from "../utils/initialStateTypes";
import {StringFilter} from '../filter/string-filter/string-filter';
import {ListFilter} from "../filter/list-filter/list-filter";
import {DateFilter} from '../filter/date-filter/date-filter';
import {ContextGrid} from "../reducer/reducer";
import {ItskTree} from '../../Itsk-tree/Itsk-tree';
import {ActionTypes} from '../utils/actionTypes';
import {ListFilterType} from '../utils/enum/list-filter-type.enum';
import {ItskIcon} from '../../itsk-icon/itskIcon';

interface ItskGridHeadDropdownProps {
  gridHeadGroupRef: HTMLDivElement | null
  column: GridColumn
}



export const ItskGridHeadDropdown: React.FC<ItskGridHeadDropdownProps> = ({gridHeadGroupRef, column}) => {
  const {state, dispatch} = useContext(ContextGrid);
  const {config, gridState} = state;
  const [container] = useState(document.getElementsByClassName('grid'));
  const filterRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (e: MouseEvent) => e.stopPropagation();
  useEffect(() => {
    if (filterRef.current === null)
      return;
    filterRef.current.addEventListener('mousedown',  handleClick)
    return () => filterRef.current?.removeEventListener('mousedown',  handleClick)
  },[]);

  const changeLockStatus = (columns: GridColumn[], columnName: string) => {
    const result: GridColumn[] = [];
    columns.forEach((column) => {
      if (column.columns !== null && column.columns !== undefined && column.columns.length > 0) {
        result.push(column);
      } else {
        result.push(column.name === columnName ? {...column, locked: !column.locked} : column);
      }
    });
    return result;
  };

  const onFilterChange = (value: string | number | number[],
                          name: string,
                          filterType: number | null | undefined,
                          dispatch: React.Dispatch<ActionTypes>,
                          FilterTypeDirectionEnum?: number,
                          equal?: boolean) => {
    if (FilterType.Number === filterType) {
      dispatch({
        type: 'SET__FILTER__VALUE',
        value: value,
        name: name,
        filterType: filterType,
        filterDirection: FilterTypeDirectionEnum
      });
      return
    }
    if (FilterType.String === filterType) {
      dispatch({
        type: 'SET__FILTER__VALUE',
        value: value,
        name: name,
        filterType: filterType
      });
      return;
    }
    if (FilterType.List === filterType) {
      dispatch({
        type: 'SET__FILTER__VALUE',
        value: value,
        name: name,
        filterType: filterType,
        equal: equal? ListFilterType.Excluded : ListFilterType.None
      });
      return;
    }
    if (FilterType.Date === filterType) {
      dispatch({
        type: 'SET__FILTER__VALUE',
        value: value,
        name: name,
        filterType: filterType,
        filterDirection: FilterTypeDirectionEnum
      })
    }
  };

  const memoizedparentPosition = useMemo(() =>
    gridHeadGroupRef && gridHeadGroupRef.offsetParent && gridHeadGroupRef.offsetParent.getClientRects()[0], [gridHeadGroupRef]);

  const parentBottom = memoizedparentPosition
    ? memoizedparentPosition.bottom
    : 0;
  const left = memoizedparentPosition && gridHeadGroupRef
    ? memoizedparentPosition.left + gridHeadGroupRef.offsetLeft
    : 0;

  const clearFilter = () =>
    dispatch({
      type: 'HANDLE__CLEAR__FILTER',
      filterType: column.filterType,
      name: column.name
    });

  const setLocked = () =>
    dispatch({
      type: 'SET__CONFIG',
      payload: changeLockStatus(config, column.name)
    });

  const setFilter = () =>
    dispatch({
      type: 'SET__FILTER__PARAMS'
    });

  const setTreeConfig = (data: GridColumn[]) =>
    dispatch({
      type: 'SET__TREE__CONFIG',
      config: data
    });


  return ReactDOM.createPortal(
  (
    <div className='grid__head__dropdown'
         style={{
           top: parentBottom,
           left: left,
         }}
         ref={filterRef}>
      <ItskTabs>
        <ItskTab label='Фильтр'>
          <div className="padding-v-3">
            {FilterType.Number === column.filterType ? <NumericFilter column={column} onFilterChange={onFilterChange} gridState={gridState}/> : null}
            {FilterType.String === column.filterType ? <StringFilter column={column} onFilterChange={onFilterChange} gridState={gridState}/> : null}
            {FilterType.List === column.filterType ? <ListFilter column={column} onFilterChange={onFilterChange} gridState={gridState} /> : null}
            {FilterType.Date === column.filterType ? <DateFilter column={column} onFilterChange={onFilterChange} gridState={gridState}/> : null}
          </div>
        </ItskTab>
        <ItskTab label='Колонки'>
          <ItskTree data={config}
                    treeCallback={(data: GridColumn[]) => setTreeConfig(data)}/>
        </ItskTab>
      </ItskTabs>
      <div className='list__delimiter'/>
      <div className='border-t-s border-color_default display-flex justify-content-between'>
        <div>
          <button className="button_default"
                  title='Очистить фильтр'
                  onClick={clearFilter}>
            <ItskIcon icon={'filter_clear-conus-x-filled'} className={'icon'}/>
          </button>
          <button className="button_default margin-l-2"
                  title={column.locked ? 'Открепить колонку' : 'Закрепить колонку'}
                  onClick={setLocked}>
            <ItskIcon icon={column.locked ? 'pin_on-hold-outline':'pin_off-hold-outline'} className={'icon'}/>
          </button>
        </div>
        <button className="button_primary"
                onClick={setFilter}>
          Применить
        </button>
      </div>
    </div>
  ),
  container[0])
};

