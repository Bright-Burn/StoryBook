import {GridColumn} from "./initialStateTypes";
import {gridState} from "./gridStateTypes";
import {StringFilterType} from "./enum/string-filter-type.enum";
import {FilterType} from "./enum/filter-type.enum";
import {ListFilterType} from "./enum/list-filter-type.enum";
import {pagerType} from "../../itsk-pager/pager-type";
// @ts-ignore
import uuid from 'react-uuid'

export class GridUtil {
  static flattenColumns(columns: any[]): any[] {
    const result: any[] = [];
    columns.forEach((column) => {
      if (column.columns !== null && column.columns !== undefined && column.columns.length > 0) {
        !column.hidden && result.push(...GridUtil.flattenColumns(column.columns));
      } else {
        !column.hidden && result.push(column);
      }
    });
    return result;
  }

  static initLockedColumns(columns: any[], locked: boolean): any[] {
    let result: any[] = [];
    if (columns !== null && columns !== undefined && columns.length > 0) {
      result = columns.filter((col) => {
        return col.locked === locked || (col.locked === undefined && !locked);
      });
    }
    return result;
  }

}

export const getBasis = (columns: GridColumn[]): number => {
  return columns.reduce((a, b) => {
    if (b.hidden)
      return a;
    if (b.width) {
      return a + b.width;
    } else {
      return a + 100
    }
  }, 0);
};

export const getFlex = (columns: GridColumn[]): number => {
  return columns.reduce((a, b) => {
    if (b.hidden)
      return a;
    if (b.flex) {
      return a + b.flex;
    } else {
      return a
    }
  }, 0);
};

const updateColumn = (column: GridColumn, hiddenColState: string[]): GridColumn => {
  return {
    ...column,
    width: column.width && column.width,
    flex: column.flex && column.flex,
    sortOrder: column.sortOrder || Number.MAX_VALUE,
    height: !column.height ? 28 : column.height,
    headerHeight: column.headerHeight || 30,
    headCellClass: !column.headCellClass ? [] : column.headCellClass,
    cellClass: !column.cellClass ? [] : column.cellClass,
    locked: column.locked || false,
    name: column.name || '',
    caption: column.caption === null || column.caption === undefined ? column.name : column.caption,
    unit: column.unit || '',
    sortable: column.sortable === null || column.sortable === undefined ? true : column.sortable,
    filterable: column.filterable === null || column.filterable === undefined ? true : column.filterable,
    sortField: !column.sortField ? column.name : column.sortField,
    filterField: !column.filterField ? column.name : column.filterField,
    filterType: column.filterType !== null && column.filterType !== undefined && typeof column.filterType === "number" ? column.filterType : null,
    stringFilterType: column.stringFilterType || StringFilterType.Contains,
    // listFilterType : column.listFilterType || ListFilterType.None,
    strict: column.strict || false,
    filterOptions: column.filterOptions,
    parameters: column.parameters,
    disableable: column.disableable === null || column.disableable === undefined ? true : column.disableable,
    editable: column.editable === null || column.editable === undefined ? true : column.editable,
    hidden: (hiddenColState && hiddenColState.indexOf(column.name) !== -1)
      ? true
      : column.hidden !== undefined ? column.hidden : false,
  }
};

export const updateColumns = (columns: GridColumn[], hiddenColState: string[] = []) => {
  const result: GridColumn[] = [];
  columns.forEach((column) => {
    if (column.columns !== null && column.columns !== undefined && column.columns.length > 0) {
      result.push(
        { ...column,
          columns: updateColumns(column.columns, hiddenColState),
          hidden: (hiddenColState && hiddenColState.indexOf(column.name && column.name) !== -1)
          ? true
          : column.hidden !== undefined ? column.hidden : false
        });
    } else {
      result.push(updateColumn(column, hiddenColState));
    }
  });
  return result;
};

export const getState = (columns: GridColumn[], sortDirection: boolean, paging: pagerType): gridState => {
  const result: gridState = {
    stringFilters: [],
    numericFilters: [],
    listFilters: [],
    dateFilters: [],
    sortParams: [{field: '', asc: sortDirection}],
    paging: paging
  };
  columns.forEach(column => {
    if (column.columns !== null && column.columns !== undefined && column.columns.length > 0) {
      const state = getState(column.columns, sortDirection, paging);
      state.stringFilters.map(option => result.stringFilters.push(option));
      state.numericFilters.map(option => result.numericFilters.push(option));
      state.listFilters.map(option => result.listFilters.push(option));
      state.dateFilters.map(option => result.dateFilters.push(option));

    } else if (column.filterType === FilterType.String) {
      result.stringFilters.push({
        value: '',
        type: column.stringFilterType || StringFilterType.Contains,
        fieldName: !column.filterField ? column.name : column.filterField,
        name: column.name
      })

    } else if (column.filterType === FilterType.Number) {
      result.numericFilters.push({
        value: {
          equalsTo: null,
          greaterThan: null,
          lessThan: null
        },
        strict: false,
        fieldName: !column.filterField ? column.name : column.filterField,
        name: column.name
      })
    } else if (column.filterType === FilterType.List) {
      result.listFilters.push({
        value: [],
        type: ListFilterType.None,
        fieldName: !column.filterField ? column.name : column.filterField,
        name: column.name
      })
    } else if (column.filterType === FilterType.Date) {
      result.dateFilters.push({
        value: {
          greaterThan: null,
          lessThan: null
        },
        fieldName: !column.filterField ? column.name : column.filterField,
        name: column.name
      })
    }
  });
  return result;
};
