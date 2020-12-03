import React, {SetStateAction, useCallback, useContext, useEffect, useState} from 'react';
import {ItskDatePicker} from '../../itsk-date-picker/itsk-date-picker'
import {FilterType} from '../utils/enum/filter-type.enum'
import {ItskSelect} from "../../itsk-select/itsk-select";
import {ContextGrid} from "../reducer/reducer";
import {GridColumn} from "../utils/initialStateTypes";

interface Props {
  config: GridColumn[]
  row: any
  expanded: boolean
  className: string
  isLocked: boolean
  setRowEditStart: React.Dispatch<SetStateAction<any>>
  rowEditStart: any
  setCellEditStart: React.Dispatch<SetStateAction<any>>
  cellEditStart: any
  depth?: number
  setClickedRow: React.Dispatch<SetStateAction<any>>
  clickedRow: any
}
interface ICellProps {
  column: GridColumn,
  row: any
  setToggleRow: any
  toggle: any
  depth: any
  cellEditStart: any
  editCell: any
  expanded: any
  rowEditStart: any
  getCellEditField: any
  onRowEdit: any
}
const Cell: React.FC<ICellProps> = ({column,
                                      row,
                                      depth,
                                      setToggleRow,
                                      cellEditStart,
                                      editCell,
                                      expanded,
                                      toggle,
                                      rowEditStart,
                                      getCellEditField,
                                      onRowEdit,
                                       }) => {
  const getList = (options: any[], chosenElements: any[]) => {
    //TODO нужно переделать
    const chosenElementsNames:any[] = []
     options?.map(option => {
       if(typeof row[column.name] !== "object") {
         option.id === row[column.name] && chosenElementsNames.push(option.name)
         return
       }
       const elem = chosenElements.find(elem => elem === option.id)
       elem && chosenElementsNames.push(` ${option.name}`)
     })
    return chosenElementsNames
  }
  return (
      <div className={`grid__cell align-center ${column.cellClass} ${row.cellClass}`}
           style={{
             flexGrow: column.flex,
             flexBasis: column.width ? column.width : 100,
           }}
           onClick={(event) => editCell(event, column)}
      >
        {
          column.render
            ? column.render(row, setToggleRow, toggle, depth)

            : row.id === rowEditStart?.id && column.editable && row.id !== undefined
            || cellEditStart?.row?.id === row.id && (cellEditStart?.editedCellName === column.name)
            ? getCellEditField(column, row, onRowEdit)
            : <span className='grid__cell_text'
                    style={{whiteSpace: expanded? 'normal' : 'nowrap'}}
                   >
                    {
                      column.filterType === FilterType.List
                      && column.filterOptions && getList(column.filterOptions, row[column.name])
                      ||  (column.filterType === FilterType.Date
                      && (row[column.name] && new Date(row[column.name]).toLocaleString()))
                      || row[column.name]
                    }
                  </span>
        }

      </div>
    )
}
export const ItskGridBodyGroupCell: React.FC<Props> = ({config,
                                                         row, expanded,
                                                         className,
                                                         isLocked,
                                                         depth = 1,
                                                         rowEditStart,
                                                         setRowEditStart,
                                                         setCellEditStart,
                                                         cellEditStart,
                                                         clickedRow,
                                                         setClickedRow}) => {
  const {state} = useContext(ContextGrid);
  const {
          toggleRowAndCellEdit,
          // cellEditStart,
          lockedBasis,
          unlockedBasis,
          checkActiveRow,
          checkRowEdit,
          onRowEdit,
          onRowClick} = state;
  const [toggle, setToggleRow] = useState(false);
  const [rowData, setRowData] = useState(row);
  useEffect(() => {
    setRowData(row)
  }, [row])

  const getCellEditField = useCallback((column: GridColumn, rowData: any, onRowEdit: ((row: any) => void) | null) => {
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) =>{
      const changedRow = {...rowData, [column.name]: event.target.value}
      setRowData(changedRow)
      onRowEdit
      && onRowEdit(
        {
          row: changedRow,
          editedCellName: column.name
        })
     };
    const handleDatepicker = (arg: Date | null) => {
      const changedRow = {...rowData, [column.name]: arg}
      setRowData(changedRow)
      onRowEdit
      && onRowEdit(
        {
          row: changedRow,
          editedCellName: column.name
        })
    }
    const handleSelect = (arg: any[]) => {
      const changedRow = {...rowData, [column.name]: arg}
      setRowData(changedRow)
      onRowEdit
      && onRowEdit(
        {
          row: changedRow,
          editedCellName: column.name
        })
    }
    switch (column.filterType) {
      case FilterType.Date:
        return <ItskDatePicker {...column.dateFilterOptions}
                               callback={handleDatepicker}
                               fixed={true}
                               defaultDate={rowData[column.name] ? new Date(rowData[column.name]) : new Date()}
                               style={{flexGrow: column.flex ? column.flex : 1}}/>;

      case FilterType.List:
        return <ItskSelect selectCallback={handleSelect}
                           items={column.filterOptions}
                           canClose={true}
                           multiple={true}
                           initialValue={typeof rowData[column.name] === "object"? rowData[column.name] : [rowData[column.name]]}
                           selected={true}
                           style={{height: '100%'}}
                           textRef={'name'}
                           valueRef={'id'}
                           fixed={true}
                           doesSelectCloseWhenOptionSelected={true}>
        </ItskSelect>;
      case FilterType.String:
        return <input onChange={handleInput}
                      type="text"
                      className='input__field container_auto '
                      value={rowData[column.name]}/>;
      case FilterType.Number:
        return <input onChange={handleInput}
                      type="text"
                      className='input__field container_auto '
                      value={rowData[column.name]}/>;
      default:
        return <span className='grid__cell_text'>
                  {rowData[column.name]}
               </span>
    }
  },[rowData]);

  // const getCellTextCaption = useCallback( (column: any, row: any) => {
  //   switch (column.filterType) {
  //     case FilterType.List:
  //       const filterOption = column.filterOptions && column.filterOptions.find((option: { id: number }) => option.id === row[column.name]);
  //       return filterOption && filterOption.name;
  //     case FilterType.Date:
  //       return new Date(row[column.name]).toLocaleString();
  //     default:
  //       if (typeof row[column.name] ==='boolean')
  //         return row[column.name]? 'Да' : 'Нет';
  //       return row[column.name]
  //   }
  // },[]);

  const editRow = (event: React.MouseEvent) => {
    if (!toggleRowAndCellEdit && checkRowEdit && checkRowEdit(row))
      setRowEditStart(row)
    if (onRowClick) {
      onRowClick({row, ctrlKey: event.ctrlKey})
      setClickedRow(row)
    }
  };

  const editCell = (event: React.MouseEvent, column: GridColumn) => {
    if (toggleRowAndCellEdit && column.editable && checkRowEdit && checkRowEdit(row))
      setCellEditStart({row: row, editedCellName: column.name})
    if (onRowClick) {
      onRowClick({row, ctrlKey: event.ctrlKey})
      setClickedRow(row)
    }
  };

  const showSubRows = () => {
    let nodesArray: React.ReactNode[] = [];
    if (row.rows && row.rows.length > 0) {
      row.rows.map((row: any) => {
        nodesArray.push(<ItskGridBodyGroupCell config={config}
                                               expanded={false}
                                               row={row}
                                               isLocked={isLocked}
                                               className={className}
                                               depth={depth + 1}
                                               rowEditStart={rowEditStart}
                                               setRowEditStart={setRowEditStart}
                                               cellEditStart={cellEditStart}
                                               setCellEditStart={setCellEditStart}
                                               clickedRow={clickedRow}
                                               setClickedRow={setClickedRow}
                                               key={row.id}/>)
      });
    }
    return nodesArray
  };
  const renderCell = (column: GridColumn) => <Cell column={column}
                                                   row={rowData}
                                                   cellEditStart={cellEditStart}
                                                   depth={depth}
                                                   editCell={editCell}
                                                   expanded={expanded}
                                                   getCellEditField={getCellEditField}
                                                   onRowEdit={onRowEdit}
                                                   rowEditStart={rowEditStart}
                                                   setToggleRow={setToggleRow}
                                                   toggle={toggle}
                                                   key={column.name + row.id}
                                                   />
  return (
    <>
      <div className={`grid__row 
                        ${className} 
                        ${checkActiveRow && checkActiveRow(row)
                          ? 'grid__row grid__row_active'
                          : 'grid__row'}`}
           style={
             {
               minWidth: isLocked ? lockedBasis : unlockedBasis,
             }
           }
           onClick={editRow}>
        {config.map(renderCell)}
      </div>
      {
        toggle
        && showSubRows()
      }
    </>
  );
};

