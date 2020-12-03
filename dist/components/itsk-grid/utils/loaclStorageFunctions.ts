import {gridState} from './gridStateTypes';
import {GridColumn} from './initialStateTypes';

type setStorageStateFnType = (stateful: boolean, cookieName: string | undefined, gridState: gridState) => void
type setStorageHiddenFnType = (stateful: boolean, cookieName: string,  updatedConfig: GridColumn[]) => void
type getLocalStorageStateFnType = (stateful: boolean, cookieName: string) => gridState | null
type getLocalStorageHiddenFnType = (stateful: boolean, cookieName: string) => string
type getHiddenColumnsArrayType = (columns: GridColumn[]) => string[]


export const setStateToLocalStorage: setStorageStateFnType = (stateful, cookieName, gridState) => {
  if (stateful && cookieName)
    localStorage.setItem(`${cookieName}`, JSON.stringify(gridState));
};

export const getStateFromLocalStorage: getLocalStorageStateFnType = (stateful, cookieName) => {
  if (stateful && cookieName)
    return JSON.parse(localStorage.getItem(`${cookieName}`) || "null");
  return null
};

export const setHiddenToLocalStorage: setStorageHiddenFnType = (stateful, cookieName, updatedConfig,) => {
  if (stateful && cookieName && updatedConfig)
    localStorage.setItem(`${cookieName}_hidden`, JSON.stringify(getHidden(updatedConfig)));
};

export const getHiddenFromLocalStorage: getLocalStorageHiddenFnType = (stateful, cookieName) => {
  if (stateful && cookieName)
    return localStorage.getItem(`${cookieName}_hidden`) || 'null';
  return 'null'
};

const getHidden: getHiddenColumnsArrayType = (columns) => {
  const res: string[] = [];
  columns.forEach((col) => {
    if (col.hidden) {
      res.push(col.name && col.name );
    }
    if (col.columns !== null && col.columns !== undefined && col.columns.length) {
      res.push(...getHidden(col.columns));
    }
  });
  return res;
};
