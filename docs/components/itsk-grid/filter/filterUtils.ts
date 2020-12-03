import {FilterType} from '../utils/enum/filter-type.enum';
import {FilterTypeDirectionEnum} from '../utils/enum/filter-type-direction.enum';
import {gridState} from '../utils/gridStateTypes';
import {deepCopy} from '../../../common/util/commonFunctions';
import {ListFilterType} from '../utils/enum/list-filter-type.enum';

export const onChangeFilter = (gridState: gridState,
                               name: string,
                               filterType: number | null | undefined,
                               value: string | number[] | number | any[],
                               filterDirection: number | undefined,
                               equal?: ListFilterType): gridState => {

  const gridStateClone = deepCopy(gridState);

  if (filterType === FilterType.String) {
    gridStateClone.stringFilters.forEach(col => (col.name === name && typeof value === "string") ? col.value = value : null);
    return gridStateClone
  }
  else if (filterType === FilterType.Number && !isNaN(+value)) {
    switch (filterDirection) {
      case FilterTypeDirectionEnum.greaterThan:
         gridStateClone.numericFilters.forEach(col => col.name === name ? col.value.greaterThan = +value : null);
         break;
      case FilterTypeDirectionEnum.lessThan:
         gridStateClone.numericFilters.forEach(col => col.name === name ? col.value.lessThan = +value : null);
        break;
      case FilterTypeDirectionEnum.equal:
         gridStateClone.numericFilters.forEach(col => col.name === name ? col.value.equalsTo = +value : null);
    }
    return gridStateClone
  }
  else if (filterType === FilterType.List) {
    gridStateClone.listFilters.forEach(col => {
      if (col.name === name && value instanceof Array) {
        col.value = [...value];
        col.type = equal
      }
      return gridStateClone
    })
  }
  else if (filterType === FilterType.Date) {
    switch (filterDirection) {
      case FilterTypeDirectionEnum.greaterThan:
        gridStateClone.dateFilters.forEach(col => (col.name === name && typeof value === 'number') ? col.value.greaterThan = value : null);
        break;
      case FilterTypeDirectionEnum.lessThan:
        gridStateClone.dateFilters.forEach(col => (col.name === name && typeof value === 'number') ? col.value.lessThan = value : null);
    }
    return gridStateClone
  }
  return gridStateClone
};

export const onClearFilter = (gridState: gridState,
                              name: string,
                              filterType: number | null | undefined,
                              ) => {
  const gridStateClone = deepCopy(gridState);

  if (filterType === FilterType.String) {
    gridStateClone.stringFilters.forEach(col => (col.name === name) ? col.value = '' : null);
    return gridStateClone
  }
  else if (filterType === FilterType.Number) {
    gridStateClone.numericFilters.forEach(col => col.name === name
      ? col.value = {
        equalsTo: null,
        greaterThan: null,
        lessThan: null
      }
      : null);
    return gridStateClone
  }
  else if (filterType === FilterType.List) {
    gridStateClone.listFilters.forEach(col => col.name === name ? col.value = [] : null);
    return gridStateClone
  }
  else if (filterType === FilterType.Date) {
    gridStateClone.dateFilters.forEach(col => col.name === name
      ? col.value = {
        greaterThan: null,
        lessThan: null
      }
      : null);
    return gridStateClone
  }
  gridStateClone.stringFilters.forEach(col => col.value = '');
  gridStateClone.numericFilters.forEach(col =>
    col.value = {
      equalsTo: null,
      greaterThan: null,
      lessThan: null
    }
  );
  gridStateClone.listFilters.forEach(col => col.value = []);
  gridStateClone.dateFilters.forEach(col =>
    col.value = {
      greaterThan: null,
      lessThan: null
    }
  );
  return gridStateClone
};
