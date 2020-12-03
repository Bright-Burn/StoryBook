import React, {useReducer} from 'react';

import {ContextGrid, InitialState, Reducer} from "./reducer/reducer";
import {ItskGridBody} from "./itsk-grid-body/itsk-grid-body";
import {ItskGridHead} from "./itsk-grid-head/itsk-grid-head";
import {GridColumn} from "./utils/initialStateTypes";
import {gridState} from "./utils/gridStateTypes";
import {pagerType} from '../itsk-pager/pager-type';
import {IBaseComponentProps} from '../common';
import {useGridCallback} from './utils/gridHooks';


interface ItskGridProps extends IBaseComponentProps{
  columnsConfig: GridColumn[]
  grid: any[]
  paging?: pagerType | null
  gridState?: gridState | null
  cookieName?: string
  stateful?: boolean
  gridBodyClassName?: string
  setCellEditable?: boolean
  getStateCallback?: (state: gridState | null) => void
  onRowEditStart?: (row: any) => void
  onRowEditEnd?: (row: any) => void
  onCellEditStart?: ({row, editedCellName}:{row: any, editedCellName: string}) => void
  onCellEditEnd?: ({row, editedCellName}:{row: any, editedCellName: string}) => void
  getConfigFilteredByTree?: (arg: any) => void
  onRowClick?: (row: any) => void
  checkRowIsEdited?: (row: any) => boolean
  checkRowIsSelected?: (row: any) => boolean
  // onRowDoubleClick?: (row: any) => void
}

export const ItskGrid: React.FC<ItskGridProps> = ({
                                                    setCellEditable = false,
                                                    columnsConfig,
                                                    grid,
                                                    gridState,
                                                    getStateCallback,
                                                    getConfigFilteredByTree = () => {},
                                                    onRowClick ,
                                                    onCellEditStart,
                                                    onRowEditStart,
                                                    onRowEditEnd,
                                                    onCellEditEnd,
                                                    checkRowIsEdited,
                                                    checkRowIsSelected,
                                                    paging,
                                                    cookieName,
                                                    stateful,
                                                    style,
                                                    className = '',
                                                    gridBodyClassName = '',
                                                  }) => {
  const [state, dispatch] = useReducer(Reducer, InitialState);

  useGridCallback(() => {
                                    dispatch({
                                      type: 'SET__OPTIONS',
                                      cookieName: cookieName,
                                      stateful: stateful,
                                      toggleRowAndCellEdit: setCellEditable,
                                    });
                                  }, '', true );
  useGridCallback(() => {
                                    dispatch({
                                      type: 'SET__CONFIG',
                                      payload: columnsConfig,
                                    });
                                  }, columnsConfig, Object.keys(columnsConfig).length !== 0 );
  useGridCallback(() => {
                                    dispatch({
                                      type: 'SET__GRID',
                                      payload: grid
                                    });
                                  }, grid, true );
  useGridCallback(() => {
                                    paging
                                    && Object.keys(paging).length !== 0
                                    && state.gridState !== null
                                    &&  dispatch({
                                      type: 'SET__GRID__STATE',
                                      state: {...state.gridState, paging: {...state.gridState.paging, ...paging}},
                                    });
                                  }, paging, true );

  useGridCallback(() => {
                                    gridState !== null
                                    && gridState
                                    && dispatch({
                                    type: 'SET__GRID__STATE',
                                    state: gridState,
                                    })
                                  }, gridState, true);

  useGridCallback(() => { checkRowIsSelected
                                    && dispatch({
                                    type: 'SET__CHECK__ACTIVE__ROW',
                                    checkFn: checkRowIsSelected,
                                    })
                                  }, checkRowIsSelected, true);
  useGridCallback(() => { checkRowIsEdited
                                    && dispatch({
                                    type: 'SET__CHECK__ROW__EDIT',
                                    checkRowEdit: checkRowIsEdited,
                                    })
                                  }, checkRowIsEdited, true);
  useGridCallback(() => { onRowClick
                                    && dispatch({
                                    type: 'SET__ON__ROW__CLICK',
                                    onRowClick
                                    })
                                    }, onRowClick, true)
  useGridCallback(() => { onRowEditEnd
                                  && dispatch({
                                    type: 'SET__ON__ROW__EDIT',
                                    editedRow: onRowEditEnd
                                  })
                                  }, onRowEditEnd, true)
  useGridCallback(() => {getConfigFilteredByTree(state.treeConfig)}, state.treeConfig, true);
  useGridCallback(() => {getStateCallback && getStateCallback(state.gridState)}, state.isGridStateChanged, state.gridState !== null);
  useGridCallback(() => {onRowEditStart && onRowEditStart(state.rowEditStart)}, state.rowEditStart, !setCellEditable && state.rowEditStart.id);
  useGridCallback(() => {onCellEditStart && onCellEditStart (state.cellEditStart)}, state.cellEditStart, setCellEditable);
  useGridCallback(() => {onCellEditEnd && onCellEditEnd(state.cellEditEnd)}, state.cellEditEnd, setCellEditable);

  return (
    <ContextGrid.Provider value={{dispatch, state}}>
      <div className={`grid ${className}`} style={style}>
        <ItskGridHead/>
        <ItskGridBody gridBodyClassName={gridBodyClassName}/>
      </div>
    </ContextGrid.Provider>
  );
};
