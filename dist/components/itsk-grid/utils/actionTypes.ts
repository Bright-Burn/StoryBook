import {GridColumn} from "./initialStateTypes";
import {gridState} from "./gridStateTypes";
import {ListFilterType} from './enum/list-filter-type.enum';

type setConfig = {
  type: 'SET__CONFIG',
  payload: GridColumn[],
}

type setGridState = {
  type: 'SET__GRID__STATE',
  state: gridState
}
type setGrid = {
  type: 'SET__GRID',
  payload: any[]
}

type toggleEditedRow = {
  type: 'TOGGLE__EDITED__ROW',
  row: any,
}
type toggleEditedCell = {
  type: 'TOGGLE__EDITED__CELL',
  row: any,
  editedCellName: string
}

type onScroll = {
  type: 'ON__SCROLL',
  payload: HTMLDivElement | number,
  GridBodyRightRef: HTMLDivElement | null
}

type onDragStart = {
  type: 'ON__DRAG__START',
  payload: number
}

type setFilterValue = {
  type: 'SET__FILTER__VALUE',
  value: string | number[] | number,
  name: string
  filterType: number | null
  filterDirection?: number
  equal?: ListFilterType
}
type setSortParams = {
  type: 'SET__SORT__PARAMS',
  payload: string,
}

type setFilterParams = {
  type: 'SET__FILTER__PARAMS'
}
type handleClearFilter = {
  type: 'HANDLE__CLEAR__FILTER'
  name: string
  filterType: number | null | undefined
}
type setTreeConfig = {
  type: 'SET__TREE__CONFIG'
  config: GridColumn[]
}
type setGridOptions = {
  type: 'SET__OPTIONS'
  cookieName?: string,
  stateful?: boolean,
  toggleRowAndCellEdit?: boolean,
}
type setCheckActiveRow = {
  type: 'SET__CHECK__ACTIVE__ROW'
  checkFn: (arg: any) => boolean
}

type seCheckRowEdit = {
  type: 'SET__CHECK__ROW__EDIT'
  checkRowEdit: (arg: any) => boolean
}
type setRowEditEnd = {
  type: 'SET__ON__ROW__EDIT'
  editedRow?: (row: {row: any, editedCellName: string}) => void
}
type onRowClick = {
  type: 'SET__ON__ROW__CLICK'
  onRowClick: (row: {row: any, ctrlKey: boolean}) => void
}


export type ActionTypes = setConfig |
  setGrid |
  toggleEditedRow |
  toggleEditedCell |
  onScroll |
  onDragStart |
  setFilterValue |
  setSortParams |
  setFilterParams |
  setGridState |
  handleClearFilter |
  setTreeConfig |
  setGridOptions |
  setCheckActiveRow |
  seCheckRowEdit |
  onRowClick |
  setRowEditEnd
