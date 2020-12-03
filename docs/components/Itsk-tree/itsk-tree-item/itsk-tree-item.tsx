import React, {SetStateAction, useState} from 'react';
import {ItskCheckbox} from '../../itsk-checkbox/itsk-checkbox';
import {ItskIcon} from '../../itsk-icon/itskIcon';

interface ItskTreeItemProps {
  columns: any[],
  modelArray: any[]
  setColumnsData: React.Dispatch<SetStateAction<any>>,
  allColumns: any[]
  isParentHavingAllColumnsHidden:(arg: any[]) => boolean
}
const toggleParentEl = (columns: any[], checkState: boolean) => {
  const result: any[] = [];
  columns.forEach(column => {
    column.columns && column.columns.length > 0
      ? result.push({...column, columns: toggleParentEl(column.columns, checkState), hidden: !checkState})
      : result.push({...column, hidden: !checkState})
  });
  return result
};

const toggleHiddenColumn = (checkState: boolean, col: any, columns: any[]) => {
  const result: any[] = [];
  columns.forEach(column => {
    column.columns && column.columns.length > 0
      ? result.push(column.name === col.name
        ? {...column, hidden: !checkState, columns: toggleParentEl(column.columns, checkState)}
        : {...column, columns: toggleHiddenColumn(checkState, col, column.columns)})
      : result.push(column.name === col.name ? {...column, hidden: !checkState} : column)
  });
  return result
};

export const ItskTreeItem: React.FC<ItskTreeItemProps> = ({ setColumnsData,
                                                            columns,
                                                            modelArray,
                                                            allColumns,
                                                            isParentHavingAllColumnsHidden}) => {
  const [treeToggle, setTreeToggle] = useState<string[]>([]);

  const checkParentHiddenState = (columns: any[]) => {
    const result: any[] = [];
    columns.forEach(column => {
      column.columns && column.columns.length > 0
        ? result.push({...column, hidden: !isParentHavingAllColumnsHidden( column.columns), columns: checkParentHiddenState(column.columns)})
        : result.push(column)
    });
    return result
  };
  return (
    <>
    {columns.map((column, index) =>
        column.columns && column.columns.length > 0
          ? <div key={index}>
              <div className='tree__item' >
                <div className='tree__toggle'
                     onClick={() => {
                       if (treeToggle.includes(column.name || column.caption)) {
                       setTreeToggle(treeToggle.filter(name => name !== ( column.name || column.caption)))
                       } else{
                       setTreeToggle([...treeToggle, column.name || column.caption])
                      }
                     }}>
                  <ItskIcon icon={treeToggle.includes(column.name || column.caption)? 'group_square_min-minus-rectangle-filled' : 'group_square_max-plus-rectangle-filled'} className='icon tree__toggle_icon'/>
                </div>
                <ItskCheckbox onChange={(checkState) => setColumnsData(toggleHiddenColumn(checkState.includes(column.name), column, allColumns))}
                              binary={false}
                              model={modelArray}
                              disabled={column.disableable}
                              value={column.name || column.caption}>
                  {column.caption && column.caption}
                </ItskCheckbox>
              </div>
              {treeToggle.includes(column.name || column.caption)
                ? <div className='tree__host'>
                    <ItskTreeItem columns={column.columns}
                                  setColumnsData={setColumnsData}
                                  modelArray={modelArray}
                                  allColumns={allColumns}
                                  isParentHavingAllColumnsHidden={isParentHavingAllColumnsHidden}/>
                  </div>
                : null}
            </div>

          : <div className='tree__item' key={index}>
              <ItskCheckbox onChange={(checkState) => setColumnsData(checkParentHiddenState(toggleHiddenColumn(checkState.includes(column.name), column, allColumns)))}
                            binary={false}
                            model={modelArray}
                            disabled={!column.disableable}
                            value={column.name}>
                {column.caption && column.caption}
              </ItskCheckbox>
            </div>
    )}
    </>
  );
};

