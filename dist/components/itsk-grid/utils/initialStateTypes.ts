import {FilterType} from "./enum/filter-type.enum";
import {StringFilterType} from "./enum/string-filter-type.enum";
import {ListFilterType} from "./enum/list-filter-type.enum";
import {gridState} from "./gridStateTypes";
import { pagerType } from "../../itsk-pager/pager-type";
import React, {SetStateAction} from 'react';
import {IItskDatePicker} from "../../itsk-date-picker/itsk-date-picker";

type filterOptions<T> = {
  id: T
  name?: string
}

type cellEditType = {
  row: any
  editedCellName: string
}
export interface IGridRow {
  [propName: string]: any
}
export type GridColumn = {
  width?: number
  flex?: number
  sortOrder?: number
  height?: number
  headerHeight?: number
  locked?: boolean
  name: string
  caption: string | JSX.Element
  unit?: string
  hint?: string
  sortable?: boolean
  sortField?: string
  filterable?: boolean
  filterField?: string
  filterType?: FilterType | null
  filterOptions?: filterOptions<any>[]
  stringFilterType?: StringFilterType
  listFilterType?: ListFilterType
  dateFilterOptions?: IItskDatePicker
  strict?: boolean
  disableable?: boolean
  headCellClass?: string[]
  cellClass?: string[]
  parameters?: any
  editable?: boolean
  hidden?: boolean
  columns?: GridColumn[]
  id?: number | string
  render?: (row: any, setToggleRow?: React.Dispatch<SetStateAction<boolean>>, toggle?: boolean, depth?: number) => React.ReactNode
}
export type InitialStateType = {
  grid: IGridRow[]
  config: GridColumn[]
  paging: Partial<pagerType>
  treeConfig: GridColumn[]
  gridState: gridState | null
  isGridStateChanged: boolean | null
  isAscSort: boolean
  verticalScroll: number
  horizontalScroll: number
  lockedColumns: GridColumn[]
  unlockedColumns: GridColumn[]
  lockedBasis: number
  unlockedBasis: number
  lockedFlex: number
  unlockedFlex: number
  onDragStart: number
  onDragEnd: number
  filteredGrid: any[]
  rowEditStart: any
  rowEditEnd: any
  cellEditStart: cellEditType
  cellEditEnd: cellEditType
  toggleRowAndCellEdit: boolean
  cookieName: string
  stateful: boolean
  initialLoad: boolean
  onRowEdit: ((row: {row: any, editedCellName: string}) => void) | null
  checkActiveRow: ((arg: any) => boolean) | null
  checkRowEdit: ((arg: any) => boolean) | null
  onRowClick: ((row: {row: any, ctrlKey: boolean}) => void) | null
};
