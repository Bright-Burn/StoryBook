import React, {useEffect, useState} from 'react';
import {ItskTreeItem} from './itsk-tree-item/itsk-tree-item';
import {GridColumn} from '../itsk-grid/utils/initialStateTypes';
import {IBaseComponentProps} from '../common';

interface ItskTreeProps extends IBaseComponentProps{
  data: any[] | GridColumn[]
  treeCallback: (arg: any[] | GridColumn[]) => void
}

const isParentHavingAllColumnsHidden = (columns: any[]) => {
  const isHidden = columns.some((column: any) =>
    column.columns && column.columns.length > 0
      ? isParentHavingAllColumnsHidden(column.columns)
      : !column.hidden );
  return isHidden
};

const excludeHiddenColumn = (columns: any[]) => {
  const result: any[] = [];
  columns.forEach(column => {
    column.columns && column.columns.length > 0
      ? isParentHavingAllColumnsHidden(column.columns) && result.push(...excludeHiddenColumn(column.columns), column.name || column.caption)
      : !column.hidden && result.push(column.name)
  });
  return result
};


export const ItskTree: React.FC<ItskTreeProps> = ({data, treeCallback, className, style}) => {
  const [columnsData, setColumnsData] = useState(data);
  const [modelArray, setModelArray] = useState(data);

  useEffect(() => {
    setModelArray(excludeHiddenColumn(data))
  }, [data]);

  useEffect(() => {
    treeCallback(columnsData)
  },[columnsData]);

  return (
    <div className={`tree__container ${className}`} style={{marginLeft: '24px ', ...style}}>
      <ItskTreeItem columns={data}
                    setColumnsData={setColumnsData}
                    modelArray={modelArray}
                    allColumns={data}
                    isParentHavingAllColumnsHidden={isParentHavingAllColumnsHidden}/>

    </div>
  );
};

