import React, {useEffect, useState} from 'react';
import {ItskGrid} from '../itsk-grid'
import {ItskPager} from '../../itsk-pager/itsk-pager'
import {ItskGridFilter} from '../filter/itsk-grid-filter'
import {ItskTree} from '../../Itsk-tree/Itsk-tree'
import {GridColumn} from '../utils/initialStateTypes';
import {gridState} from '../utils/gridStateTypes';
import {pagerType} from '../../itsk-pager/pager-type';
import { ItskIcon } from '../../itsk-icon/itskIcon';

interface ItskGridWrapperProps {
  data: any[]
  columns: GridColumn[]
  paging?: pagerType
  stateful?: boolean
  toggleRowAndCellEdit?: boolean
  cookieName?: string
  rowEditable?: boolean
  showFilterButton?: boolean
  showColumnsButton?: boolean
  showPager?: boolean
  stateCallback?: (arg: gridState) => void
  getRowEditStartCallback?: (arg: any) => void
  getRowEditEndCallback?: (arg: any) => void
  getCellEditStartCallback?: (arg: any) => void
  getCellEditEndCallback?: (arg: any) => void
}

export const ItskGridWrapper: React.FC<ItskGridWrapperProps> = ({ data,
                                                                  columns,
                                                                  showFilterButton,
                                                                  showColumnsButton,
                                                                  paging,
                                                                  cookieName,
                                                                  stateful,
                                                                  // rowEditable,
                                                                  // toggleRowAndCellEdit,
                                                                  stateCallback,
                                                                  showPager,
                                                                  // getRowEditStartCallback,
                                                                  // getRowEditEndCallback,
                                                                  // getCellEditEndCallback,
                                                                  // getCellEditStartCallback
}) => {
  const [state, setGridState] = useState<gridState | null>(null);
  const [config, setConfig] = useState<GridColumn[]>(columns || []);
  const [gridPaging, setPaging] = useState<pagerType | null>(paging || null);
  const [treeToggleState, setTreeToggleState] = useState(false);
  const [filterToggleState, setFilterToggleState] = useState(false);

  useEffect(() => {
    if(stateCallback && state)
    stateCallback(state)
  }, [state]);
  useEffect(() => {
    if (paging)
      setPaging(paging)
  }, [paging]);
  useEffect(() => {
    if (columns)
      setConfig(columns)
  }, [columns]);

  const handleArrowLeft = () => {
    if (gridPaging && gridPaging.page)
      if (gridPaging.page >= 1)
        setPaging({...gridPaging, page: gridPaging.page - 1})
  };
  const handleArrowRight = () => {
    if (gridPaging && gridPaging.totalCount && gridPaging.page !== undefined && gridPaging.pageSize)
      if (gridPaging.totalCount && (gridPaging.page <= (Math.ceil(gridPaging.totalCount / gridPaging.pageSize) - 2)))
        setPaging({...gridPaging, page: (gridPaging.page || 0) + 1})
  };
  const handlePageNumber = (page: number) => {
    setPaging({...gridPaging, page: page})
  };
  const handlePageSize = (pageSize: number) => {
    setPaging({...gridPaging, pageSize: pageSize, page: 0})
  };

  return (
    <div className='grid-wrapper '>
      <div className='grid-wrapper__panel'>
        {showFilterButton &&
          <button className="button_secondary"
                  onClick={() => {
                    if (showFilterButton) {
                      setFilterToggleState(!filterToggleState);
                      setTreeToggleState(false)
                    }
                  }
                  }>
            <ItskIcon icon={'filter-conus-filled'}/>
          </button>
        }
        {showColumnsButton &&
          <button className="button_secondary"
                  onClick={() => {
                    if (showColumnsButton) {
                      setTreeToggleState(!treeToggleState);
                      setFilterToggleState(false)}
                    }
                  }>
            <ItskIcon icon={'wrench-repair-filled'}/>
          </button>
        }
      </div>
      <div className="grid-wrapper__container" style={{minHeight: "auto"}}>
        {treeToggleState
          ? <div className='grid-wrapper__sidebar'>
            <div className='container container_column container_auto scrollbar'>
              <ItskTree data={config}
                        treeCallback={(data: any[]) => {setConfig(data)}}/>
            </div>
          </div>
          : null
        }
        {filterToggleState
          ? <div className='grid-wrapper__sidebar'>
            <div className='container container_column container_auto scrollbar'>
              <ItskGridFilter gridState={state}
                              columns={config}
                              cookieName={cookieName}
                              gridStateCallback={arg => setGridState(arg)}/>
            </div>
          </div>
          : null
        }
        <ItskGrid grid={data}
                  columnsConfig={config}
                  gridState={state}
                  getStateCallback={arg => {
                    setGridState(arg && {...arg})
                  }}
                  // toggleRowAndCellEdit={toggleRowAndCellEdit}
                  // rowEditable={rowEditable}
                  paging={gridPaging}
                  cookieName={cookieName}
                  stateful={stateful}
                  // getRowEditStartCallback={(arg: any) => getRowEditStartCallback && (getRowEditStartCallback(arg))}
                  // getRowEditEndCallback={(arg: any) => getRowEditEndCallback && getRowEditEndCallback(arg)}
                  // getCellEditStartCallback={(arg: any) => getCellEditStartCallback && getCellEditStartCallback(arg)}
                  // getCellEditEndCallback={(arg: any) => getCellEditEndCallback && getCellEditEndCallback(arg)}
                  getConfigFilteredByTree={config => setConfig(config)}
        />
      </div>
      {showPager &&
        <div className='grid-wrapper__pager'>
          <ItskPager paging={gridPaging || {}}
                     pageNumberCallback={page => handlePageNumber(page)}
                     pageSizeCallback={pageSize => handlePageSize(pageSize)}
                     arrowLeftCallback={handleArrowLeft}
                     arrowRightCallback={handleArrowRight}
          />
        </div>
      }
    </div>
  );
};

