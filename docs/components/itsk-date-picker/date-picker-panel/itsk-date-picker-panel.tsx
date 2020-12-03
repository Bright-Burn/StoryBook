import React, {useContext, useMemo} from 'react';
import {ContextDatepicker} from "../reducer/reducer";
import {EnMonthDictionary, RuMonthDictionary} from '../util/dictionary';
import {ItskIcon} from '../../itsk-icon/itskIcon';

interface Props {

}

export const ItskDatePickerPanel: React.FC<Props> = ({}) => {
    const {state, dispatch} = useContext(ContextDatepicker);
    const {year, month, options} = state;
    const monthName:[string, number][] =useMemo(() => {
      const monthArray:[string, number][] = [];
      const dictionary = options.language === 'ru'? RuMonthDictionary : EnMonthDictionary;
      for (let i = 1; i <= 12; i++) {
        monthArray.push([dictionary[i],i])
      }
      return monthArray
    }, []) ;

  const scrollMonth = (event: React.WheelEvent<HTMLButtonElement> ) =>
      dispatch({
      type: 'SCROLL__MONTH',
      eventDeltaY: event.deltaY,
      month: +month,
      popup: true
    });
    const scrollYear = (event: React.WheelEvent<HTMLButtonElement> ) =>
      dispatch({
      type: 'SCROLL__YEAR',
      eventDeltaY: event.deltaY,
      year: +year,
      popup: true
    });
    const toggleMonthList = (event: React.MouseEvent) => {
      event.stopPropagation();
      dispatch({
        type: 'TOGGLE__MONTH__LIST'
      });
      dispatch({
        type: 'TOGGLE__YEAR__LIST',
        value: false
      })
    };
  const toggleYearList = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch({
      type: 'TOGGLE__MONTH__LIST',
      value: false
    });
    dispatch({
      type: 'TOGGLE__YEAR__LIST'
    });
  };
  const getCurrentTime = () => {
    dispatch({
      type: "GET__CURRENT__TIME"
    })
  };
  const style = useMemo(() => {return {width: '100%', padding: '0 0.8rem'}}, []);
    return (
        <>
            <div className='datepicker__panel ' style={style}>
                <div className='datepicker__panel__month'>
                    <button className='block-work button_secondary'
                            onWheel={scrollMonth}
                            onClick={toggleMonthList}>
                        {monthName[month-1] && monthName[month-1][0]}
                        <ItskIcon icon={'scroll-updown-arrow-filled'} className={'margin-l-2 icon'}/>
                    </button>
                </div>
                <div className='datepicker__panel__year padding-l-2'>
                    <button className='block-work button_secondary'
                            onWheel={scrollYear}
                            onClick={toggleYearList}>
                        {year}
                      <ItskIcon icon={'scroll-updown-arrow-filled'} className={'margin-l-2 icon'}/>
                    </button>
                </div>
                {options.showToday?
                    <div className='datepicker__panel__today padding-l-2'
                         onClick={getCurrentTime}>
                        <button className='block-work button_secondary'>
                          <ItskIcon icon={'calendar-date-filled'} className={'icon'}/>
                        </button>
                    </div>
                    : null }
            </div>

        </>
    );
};

