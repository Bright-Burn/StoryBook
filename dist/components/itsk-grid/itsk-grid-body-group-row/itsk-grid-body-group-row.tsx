import React, {SetStateAction, useContext} from 'react';
import {ItskGridBodyGroupCell} from "../itsk-grid-body-group-cell/itsk-grid-body-group-cell";
import {ContextGrid} from "../reducer/reducer";

interface ItskGridBodyGroupRowProps {
  isLocked: boolean
  className?: string
  grid: any
  setRowEditStart: React.Dispatch<SetStateAction<any>>
  rowEditStart: any
  setCellEditStart: React.Dispatch<SetStateAction<any>>
  cellEditStart: any
  setClickedRow: React.Dispatch<SetStateAction<any>>
  clickedRow: any
}

export const ItskGridBodyGroupRow: React.FC<ItskGridBodyGroupRowProps> = ({
                                                                            className = '',
                                                                            isLocked,
                                                                            grid,
                                                                            rowEditStart,
                                                                            setRowEditStart,
                                                                            cellEditStart,
                                                                            setCellEditStart,
                                                                            clickedRow,
                                                                            setClickedRow
                                                                          }) => {
  const {state} = useContext(ContextGrid);
  const {lockedColumns, unlockedColumns} = state;

  const renderRow = (row: any) => <ItskGridBodyGroupCell config={isLocked ? lockedColumns : unlockedColumns}
                                                         row={row}
                                                         expanded={row.expanded}
                                                         className={className}
                                                         isLocked={isLocked}
                                                         rowEditStart={rowEditStart}
                                                         setRowEditStart={setRowEditStart}
                                                         key={isLocked ? row.id : row.id + '100'}
                                                         cellEditStart={cellEditStart}
                                                         setCellEditStart={setCellEditStart}
                                                         clickedRow={clickedRow}
                                                         setClickedRow={setClickedRow}/>
  return (
    <>
      {grid && grid.map(renderRow)}
    </>
  );
};

