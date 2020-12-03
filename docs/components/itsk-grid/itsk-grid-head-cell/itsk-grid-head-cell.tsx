import React, {useContext, useRef, useState} from 'react';
import {ContextGrid} from "../reducer/reducer";
import {FilterType} from "../utils/enum/filter-type.enum";
import {GridColumn} from "../utils/initialStateTypes";
import {ItskGridHeadDropdown} from "../itsk-grid-head-dropdown/itsk-grid-head-dropdown";
import {ItskDropdown} from '../../itsk-dropdown/itsk-dropdown';
import {ItskHint} from '../../itsk-hint/itsk-hint'
import {GridUtil} from '../utils/util';
import { ItskIcon } from '../../itsk-icon/itskIcon';

interface ItskGridHeadCellProps {
  column: GridColumn
}

export const ItskGridHeadCell: React.FC<ItskGridHeadCellProps> = ({column}) => {
  const {state, dispatch} = useContext(ContextGrid);
  const {onDragStart, config, gridState} = state;
  const gridHeadGroupRef = useRef<HTMLDivElement | null>(null);
  const [parentRef, setParentRef] = useState<HTMLDivElement | null>(null);
  const getResizedConfigColumns = (configColumns: GridColumn[], columnName: string, resize: number) => {
    let resizedColumns: GridColumn[] = [];
    configColumns.map(column => {

      if (column.columns && column.columns.length > 0) {
        resizedColumns = [...resizedColumns, {
          ...column,
          columns: getResizedConfigColumns(column.columns, columnName, resize)
        }]
      } else {
        const updatedWidth = column.name === columnName && column.filterType !== FilterType.Date
          ? {
            ...column,
            width: ((column.width || 100) - resize)
          }
          : column;
        resizedColumns = [...resizedColumns, updatedWidth];
      }
    });
    return resizedColumns
  };

  const findYourColumn = (columns: GridColumn[], id: number | string) => {
    let targetedObject: GridColumn = {name: '', caption: ''};
    columns.forEach(column => {
        if (column.columns && column.columns.length > 0) {
          const innerColumn = findYourColumn(column.columns, id);
          (innerColumn && innerColumn.name === id)
            ? targetedObject = innerColumn
            : null
        } else {
          column.name === id
            ? targetedObject = column
            : null
        }
      }
    );
    return targetedObject
  };

  const getFilteredConfigCols = (columns: GridColumn[], draggedCol: GridColumn) => {
    const result: GridColumn[] = [];
    columns.forEach((column) => {
      if (column.columns !== null && column.columns !== undefined && column.columns.length > 0) {
        result.push({...column, columns: getFilteredConfigCols(column.columns, draggedCol)});
      } else if (column === draggedCol) {

      } else {
        result.push(column);
      }
    });
    return result;
  };

  const addDraggedColToConfigColumns = (columns: GridColumn[],
                                        droppedCol: GridColumn,
                                        draggedCol: GridColumn,
                                        droppedColIndex: number,
                                        draggedColIndex: number) => {
    const result: GridColumn[] = [];
    columns.forEach((column) => {
      if (column.columns !== null && column.columns !== undefined && column.columns.length > 0) {
        result.push({...column, columns: addDraggedColToConfigColumns(column.columns, droppedCol, draggedCol, droppedColIndex, draggedColIndex)});
      } else if (column === droppedCol) {
        if (droppedColIndex < draggedColIndex) {
          result.push({...draggedCol, locked: column.locked});
          result.push(column);
        } else {
          result.push(column);
          result.push({...draggedCol, locked: column.locked});
        }
      } else {
        result.push(column);
      }
    });
    return result;
  };



  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const {id, className} = event.target  as HTMLDivElement;

    event.dataTransfer.setData("colId", id);
    event.dataTransfer.setData("className", className);
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => event.preventDefault();

  const handleOnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const {id, className} = event.target  as HTMLDivElement;
    const draggedClassName = event.dataTransfer.getData('className');
    const draggedColId = event.dataTransfer.getData('colId');

    if (!draggedColId
        || !draggedClassName
        || className.split(' ')[0] !== draggedClassName.split(' ')[0]
        || id === draggedColId)
      return;
    const droppedCol = findYourColumn(config, id);
    const draggedCol = findYourColumn(config, event.dataTransfer.getData("colId"));

    const columns = GridUtil.flattenColumns(config).filter(_ => _.hidden !== true);
    const droppedColIndex = columns.indexOf(droppedCol);
    const draggedColIndex = columns.indexOf(draggedCol);

    const filteredColsArray = getFilteredConfigCols(config, draggedCol);
    const updatedColsArray = addDraggedColToConfigColumns(filteredColsArray, droppedCol, draggedCol, droppedColIndex, draggedColIndex);

    dispatch({
      type: 'SET__CONFIG',
      payload: updatedColsArray
    });
  };
  const handleSort = () => {
    if (column.sortable)
      dispatch({
        type: 'SET__SORT__PARAMS',
        payload: column.name
      })
  };
  const handleStopEventPropagation = (event: React.MouseEvent) => {
    event.stopPropagation()
  };
  const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  };
  const onDragstart = (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    dispatch({
      type: 'ON__DRAG__START',
      payload: event.pageX,
    })
  };
  const onDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const resize = onDragStart - event.pageX;
    const resizedColumns = getResizedConfigColumns(config, column.name, resize);
    dispatch({
      type: 'SET__CONFIG',
      payload: resizedColumns
    })
  };
  const setMyInputRef = (element: HTMLDivElement) => {
    gridHeadGroupRef.current = element;
    setParentRef(element)
  };

  return (
    <>
      <div className={`grid__head__group ${column.headCellClass}`}
           style={
             {
               flexGrow: column.flex,
               flexBasis: column.width ? column.width : 100,
               width: column.width ? column.width : 100,
               minHeight: column.headerHeight
              }
           }
           onClick={handleSort}>
        <div className='grid__head__cell '
             ref={setMyInputRef}
             style={
               {
                 flexGrow: column.flex,
                 flexBasis: column.width ? column.width : 100,
                 width: column.width ? column.width : 100,
               }
             }>
          <div className={`grid__head__cell__wrapper`}
               id={column.name}
               draggable={"true"}
               onDragStart={handleDragStart}
               onDragOver={handleDragOver}
               onDragEnter={onDragEnter}
               onDrop={handleOnDrop}>

            {gridState && gridState.sortParams && gridState.sortParams[0] && gridState.sortParams[0].field === column.name
              ? <ItskIcon icon={gridState && gridState.sortParams[0] && gridState.sortParams[0].asc ? 'arrow_down-outline' : 'arrow_up-outline'} className={'grid__head__cell__icon grid__head__cell__icon__sorted'}/>
              : null}
            <div className="grid__head__cell__component">
              <span className="grid__head__cell__text">
               {column.caption}
                <ItskHint hint={column.hint && column.hint}>
                  {` ${column.unit && column.unit}`}
                </ItskHint>
              </span>
            </div>

          </div>

          {
            column.filterable
            && <div className='grid__head__cell__dropdown'
                 onClick={handleStopEventPropagation}>
              <ItskDropdown callback={arg => arg}
                            fixed={true}
                            canClose={false}
                            border='none'>
                <i className='icon icon-more-vertical grid__head__cell__dropdown__button'
                 />
                <ItskGridHeadDropdown gridHeadGroupRef={parentRef}
                                      column={column}
                                      />
              </ItskDropdown>
            </div>
          }

          <div className='grid__head__cell__resize'
               draggable={"true"}
               onClick={handleStopEventPropagation}
               onDragStart={onDragstart}
               onDragOver={handleDragOver}
               onDragEnd={onDragEnd}
          />
        </div>
      </div>
    </>
  );
};

