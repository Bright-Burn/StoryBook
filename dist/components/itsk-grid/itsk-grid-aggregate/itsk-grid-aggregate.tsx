import React, {useContext} from 'react';
import {ContextGrid} from "../reducer/reducer";

interface ItskGridAggregateProps {

}

export const ItskGridAggregate: React.FC<ItskGridAggregateProps> = ({}) => {
    const {state} = useContext(ContextGrid);
    const {unlockedBasis, lockedBasis, unlockedFlex, lockedFlex, lockedColumns, unlockedColumns, horizontalScroll } = state;
    return (
        <div className='grid__aggregate'>
            <div className='grid__aggregate_left'
                 style={{flexGrow: lockedFlex, minWidth: lockedBasis, flexBasis: lockedBasis}}>
                <div className='grid__row' style={{paddingRight: '6px'}}>
                {lockedColumns.map((column, index) =>
                    <div className='grid__cell'
                         key={index}
                         style={{flexGrow: column.flex, flexBasis: column.width? column.width : 100}}>
                        <span className='grid__cell_text'>
                             Sum: column.name
                        </span>
                    </div>

                )}
                </div>
            </div>
            <div className='grid__aggregate_right'
                 style={{flexGrow: unlockedFlex, minWidth: unlockedBasis, flexBasis: unlockedBasis}}>
                <div className='grid__row' style={{paddingRight: '6px'}} >
                    {unlockedColumns.map((column, index) =>
                        <div className='grid__cell'
                             key={index+100}
                             style={{flexGrow: column.flex, flexBasis: column.width? column.width : 100 , transform: `translateX(-${horizontalScroll}px)`}}>
                        <span className='grid__cell_text'>
                             Sum: column.name
                        </span>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

