import React, {useContext} from 'react';
import {ItskGridHeadGroup} from "../itsk-grid-head-group/itsk-grid-head-group";
import {ContextGrid} from "../reducer/reducer";

interface Props {
}

export const ItskGridHead: React.FC<Props> = () => {
  const {state} = useContext(ContextGrid);
  const {config, lockedBasis, unlockedBasis, horizontalScroll, lockedFlex, unlockedFlex, unlockedColumns, lockedColumns} = state;
  return (
    <div className='grid__head'>
      {
        lockedColumns.length > 0
        ? <div className="grid__head__left"
               style={{flexGrow: lockedFlex, minWidth: lockedBasis, flexBasis: lockedBasis, transform: `translateX(0px)`}}>
            <div className='grid__head__row grid__head__row__left'>
              <ItskGridHeadGroup config={config.filter((item) => !item.hidden && item.locked)}/>
            </div>
          </div>
        : null
      }
      {
        unlockedColumns.length > 0
        ?   <div className="grid__head__right"
                 style={{
                   transform: `translateX(-${horizontalScroll}px)`,
                   minWidth: unlockedBasis,
                   flexBasis: unlockedBasis,
                   flexGrow: unlockedFlex
                 }}>
            <div className='grid__head__row '>
              <ItskGridHeadGroup config={config.filter((item) => !item.hidden && !item.locked)}/>
              <div style={{flexGrow: 1, minWidth: 0, flexShrink: 0, maxWidth: '6px', flexBasis: '6px',}}/>
            </div>
          </div>
        : null
      }



    </div>
  );
};

