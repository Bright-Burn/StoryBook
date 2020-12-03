import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {ContextGrid} from "../reducer/reducer";
import {ItskGridBodyGroupRow} from "../itsk-grid-body-group-row/itsk-grid-body-group-row";

interface ItskGridBodyProps {
  gridBodyClassName: string
}

export const ItskGridBody: React.FC<ItskGridBodyProps> = ({gridBodyClassName}) => {
  const {state, dispatch} = useContext(ContextGrid);
  const {verticalScroll, lockedBasis, unlockedFlex, lockedFlex, unlockedBasis, lockedColumns, unlockedColumns} = state;
  const GridBodyRightRef = useRef<HTMLDivElement | null>(null);
  const GridBodyLeftRef = useRef<HTMLDivElement | null>(null);
  const [rowEditStart, setRowEditStart] = useState<any>()
  const [cellEditStart, setCellEditStart] = useState<any>()
  const [clickedRow, setClickedRow] = useState<any>()

  useEffect(() => {
    if (GridBodyLeftRef.current) {
      const onWheelBodyLeft = (event: WheelEvent) => {
        event.preventDefault();
      };
      GridBodyLeftRef.current.addEventListener('wheel', onWheelBodyLeft);
    }
  }, []);

  const scrollBodyLeft = useCallback(
    (event: React.WheelEvent) => {
    dispatch({
      type: 'ON__SCROLL',
      payload: event.deltaY,
      GridBodyRightRef: GridBodyRightRef.current
    })
  },[]);
  const scrollBody = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      if(event.target instanceof HTMLDivElement)
        dispatch({
          type: 'ON__SCROLL',
          payload: event.target,
          GridBodyRightRef: GridBodyRightRef.current
        })
    },[]);
  return (
    <div className={`grid__body ${gridBodyClassName}`}
         onScroll={scrollBody}
    >
      {lockedColumns.length > 0
        ? <div className='grid__body__left'
               style={{
                 flexGrow: lockedFlex,
                 transform: `translateY(-${verticalScroll}px)`,
                 minWidth: lockedBasis,
                 flexBasis: lockedBasis
               }}
               ref={GridBodyLeftRef}
               onWheel={scrollBodyLeft}>
          <ItskGridBodyGroupRow className={'grid__row_left'}
                                isLocked={true} grid={state.grid}
                                rowEditStart={rowEditStart}
                                setRowEditStart={setRowEditStart}
                                cellEditStart={cellEditStart}
                                setCellEditStart={setCellEditStart}
                                 clickedRow={clickedRow}
                                setClickedRow={setClickedRow}/>
        </div>
        : null
      }
      {unlockedColumns.length > 0
        ? <div className='grid__body__right scrollbar'
               ref={GridBodyRightRef}
               style={{display: 'flex', flexDirection: 'column', flexGrow: unlockedFlex, flexBasis: unlockedBasis, }}>
            <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0}}>
              <ItskGridBodyGroupRow isLocked={false} grid={state.grid} rowEditStart={rowEditStart}
                                    setRowEditStart={setRowEditStart}
                                    cellEditStart={cellEditStart}
                                    setCellEditStart={setCellEditStart}
                                    clickedRow={clickedRow}
                                    setClickedRow={setClickedRow}/>
            </div>
          </div>
        : null
      }

    </div>
  );
};

