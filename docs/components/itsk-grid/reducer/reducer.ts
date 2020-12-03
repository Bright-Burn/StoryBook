import React from "react";

import {getFlex, getState, GridUtil, updateColumns} from "../utils/util";
import {getBasis} from "../utils/util";
import {InitialStateType} from "../utils/initialStateTypes";
import {ActionTypes} from "../utils/actionTypes";
import produce, {Draft} from "immer";
import {deepEqual} from '../../../common/util/commonFunctions'

import {
  getHiddenFromLocalStorage,
  setHiddenToLocalStorage,
  getStateFromLocalStorage,
  setStateToLocalStorage
} from '../utils/loaclStorageFunctions';
import {onChangeFilter, onClearFilter} from '../filter/filterUtils';

export const InitialState: InitialStateType = {
  gridState: null,
  isGridStateChanged: null,
  grid: [],
  config: [],
  paging:  {page: 0, pageSize: 25},
  isAscSort: false,
  verticalScroll: 0,
  horizontalScroll: 0,
  unlockedColumns: [],
  lockedColumns: [],
  lockedBasis: 0,
  unlockedBasis: 0,
  lockedFlex: 0,
  unlockedFlex: 0,
  onDragStart: 0,
  onDragEnd: 0,
  filteredGrid: [],
  rowEditStart: {},
  rowEditEnd: {},
  cellEditStart: {row: {id: null}, editedCellName: ''},
  cellEditEnd: {row: {id: null}, editedCellName: ''},
  onRowEdit: null,
  toggleRowAndCellEdit: true,
  treeConfig: [],
  cookieName: '',
  stateful: false,
  initialLoad: true,
  checkActiveRow: null,
  checkRowEdit: null,
  onRowClick: null
};


export const ContextGrid = React.createContext<{ state: InitialStateType, dispatch: React.Dispatch<ActionTypes> }>
({
  state: InitialState,
  dispatch: () => null
  }
);

export const Reducer = (state = InitialState, action: ActionTypes) =>
  produce(state, (draft: Draft<InitialStateType>) => {

    switch (action.type) {
      case 'SET__CONFIG':
        if (action.payload.length === 0)
          break;
        let hiddenColArray = 'null';
        if (draft.initialLoad) {
          hiddenColArray = getHiddenFromLocalStorage(draft.stateful, draft.cookieName);
          draft.initialLoad = false;
          draft.treeConfig = updateColumns(action.payload, JSON.parse(hiddenColArray))
        }

        const updatedConfig = updateColumns(action.payload, JSON.parse(hiddenColArray));
        setHiddenToLocalStorage(draft.stateful, draft.cookieName, updatedConfig);
        const gridStateFromConfig = getState(action.payload, false, draft.paging);
        const columns = GridUtil.flattenColumns(updatedConfig).filter(_ => _.hidden !== true);
        const locked = GridUtil.initLockedColumns(columns, true);
        const unlocked = GridUtil.initLockedColumns(columns, false);

        if(!deepEqual(gridStateFromConfig, draft.gridState)) {
          const gridStateFromLocalStorage = getStateFromLocalStorage(draft.stateful, draft.cookieName);
          draft.gridState = Object.assign(
          {},
          gridStateFromConfig,
          draft.gridState? draft.gridState : {},
          gridStateFromLocalStorage? gridStateFromLocalStorage : {}
          );
          draft.isGridStateChanged = !draft.isGridStateChanged;
        }
        draft.config = updatedConfig;
        draft.lockedBasis = getBasis(locked);
        draft.unlockedBasis = getBasis(unlocked);
        draft.lockedFlex = getFlex(locked);
        draft.unlockedFlex = getFlex(unlocked);
        draft.lockedColumns = locked;
        draft.unlockedColumns = unlocked;

        break;

      case 'SET__TREE__CONFIG':
        setHiddenToLocalStorage(draft.stateful, draft.cookieName, action.config);
        draft.treeConfig = action.config;
        break;

      case "SET__GRID__STATE":
        if (action.state === null
            || Object.keys(action.state).length === 0
            || draft.gridState && deepEqual(action.state, draft.gridState))
          break;
        draft.gridState = action.state;
        draft.isGridStateChanged = !draft.isGridStateChanged;
        break;

      case 'SET__GRID':
        if(action.payload) {
        draft.grid = action.payload;
        }
        break;

      case 'SET__OPTIONS':
        if (action.cookieName !== undefined)
          draft.cookieName = action.cookieName;
        if (action.stateful !== undefined)
          draft.stateful = action.stateful;
        if (action.toggleRowAndCellEdit !== undefined)
          draft.toggleRowAndCellEdit = action.toggleRowAndCellEdit;
        break;

      case 'SET__ON__ROW__EDIT':
        if (action.editedRow !== undefined)
          draft.onRowEdit = action.editedRow;
        break;

      case 'TOGGLE__EDITED__ROW':
        if (draft.rowEditStart.id !== action.row.id) {
          draft.rowEditStart = action.row;
        }
        break;
      case "TOGGLE__EDITED__CELL":
        if (draft.cellEditStart.row.id === action.row.id
          && draft.cellEditStart.editedCellName === action.editedCellName)
          break;
          draft.cellEditStart.row = action.row;
          draft.cellEditStart.editedCellName = action.editedCellName;
        break;

      case 'ON__SCROLL':
        let verticalScroll = draft.verticalScroll,
          horizontalScroll = draft.horizontalScroll;
        if (typeof action.payload === "number" && action.GridBodyRightRef) {
          if (action.GridBodyRightRef.scrollHeight - (draft.verticalScroll + action.payload / 8) > action.GridBodyRightRef.offsetHeight
            &&
            draft.verticalScroll + action.payload / 8 >= 0) {
            verticalScroll = draft.verticalScroll + (action.payload / 2);
            horizontalScroll = draft.horizontalScroll;
            action.GridBodyRightRef.scrollTop = draft.verticalScroll + (action.payload / 2)
          } else {
            verticalScroll = draft.verticalScroll;
            horizontalScroll = draft.horizontalScroll;
          }
        } else if (typeof action.payload !== "number") {
          verticalScroll = action.payload.scrollTop;
          horizontalScroll = action.payload.scrollLeft
        }

        draft.verticalScroll = verticalScroll;
        draft.horizontalScroll = horizontalScroll;
        break;

      case 'ON__DRAG__START':
        draft.onDragStart = action.payload;
        break;

      case 'SET__FILTER__VALUE':
        if (draft.gridState === null)
          return;
        draft.gridState = onChangeFilter(draft.gridState, action.name, action.filterType, action.value, action.filterDirection, action.equal);
        break;

      case "SET__SORT__PARAMS":
        if (draft.gridState === null)
          break;
        draft.gridState.sortParams[0].asc = !draft.gridState.sortParams[0].asc;
        draft.gridState.sortParams[0].field = action.payload;
        setStateToLocalStorage(draft.stateful, draft.cookieName, draft.gridState);
        draft.isGridStateChanged = !draft.isGridStateChanged;
        draft.isAscSort = !draft.isAscSort;
        break;

      case 'SET__FILTER__PARAMS':
        if (draft.gridState === null)
          break;
        setStateToLocalStorage(draft.stateful, draft.cookieName, draft.gridState);
        draft.isGridStateChanged = !draft.isGridStateChanged;
        break;

      case 'HANDLE__CLEAR__FILTER':
        if (draft.gridState === null)
          break;
        draft.gridState = onClearFilter(draft.gridState, action.name, action.filterType);
        setStateToLocalStorage(draft.stateful, draft.cookieName, draft.gridState);
        draft.isGridStateChanged = !draft.isGridStateChanged;
        break;

      case 'SET__CHECK__ACTIVE__ROW':
        draft.checkActiveRow = action.checkFn;
        break;
      case 'SET__CHECK__ROW__EDIT':
        draft.checkRowEdit = action.checkRowEdit;
        break;
      case "SET__ON__ROW__CLICK":
        draft.onRowClick = action.onRowClick
        break;
    }
  });
