import React from 'react';
import {ItskGridHeadCell} from "../itsk-grid-head-cell/itsk-grid-head-cell";
import {GridColumn} from "../utils/initialStateTypes";
import {getBasis, getFlex} from '../utils/util';

interface ItskGridHeadGroupProps {
  config: GridColumn[]
}

export const ItskGridHeadGroup: React.FC<ItskGridHeadGroupProps> = ({config}) => {
  return (
    <>
      {config.map((column) =>

        column.columns && column.columns.length > 0
          ? <div className='grid__head__group'
                 key={column.name + (typeof column.caption === 'string' && column.caption || '')}
                 style={
                   {
                     width: getBasis(column.columns),
                     flexBasis: getBasis(column.columns),
                     flexGrow: getFlex(column.columns),
                   }
                 }>
              <div className="grid__head__group__container">
                <div className="grid__head__group__caption" style={{height: column.headerHeight}}>
                  {column.caption}
                </div>
                <div className="grid__head__group__children">
                  {!column.hidden && <ItskGridHeadGroup config={column.columns}/>}
                </div>
              </div>
            </div>

          : !column.hidden && <ItskGridHeadCell column={column} key={column.name + column.caption}/>
        )}
    </>
  );
};

