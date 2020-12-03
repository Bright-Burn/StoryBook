import React, {useContext, useMemo, useState} from 'react';
import {ContextDatepicker} from "../reducer/reducer";
import classNames from "classnames";
import {EnMonthDictionary, RuMonthDictionary, EnWeekDictionary, RuWeekDictionary} from '../util/dictionary';
import { DisabledPeriodType } from '../util/date-picker-types';

interface Props {
  disabledTo?: Date
  disabledFrom?: Date
  disabledDates?: Date[],
  disabledDays?: number[],
  disabledPeriod?: DisabledPeriodType,
}
type CheckRangeType = (year: number,
                       month: number,
                       day: number | null,
                       disabledTo: Date | undefined,
                       disabledFrom: Date | undefined,
                       disabledDates: Date[] | undefined,
                       disabledDays: number[] | undefined,
                       disabledPeriod: DisabledPeriodType | undefined,
                       row?: number) => boolean

export const checkRange: CheckRangeType = (year, month, day, disabledTo,disabledFrom, disabledDates, disabledDays, disabledPeriod) => {
  if (!day)
    return false;
  const date = new Date(year, month-1, day)
  if (disabledTo && date <= disabledTo)
    return false
  else if (disabledFrom && (date >= disabledFrom))
    return false
  else if (disabledDays && disabledDays.length && disabledDays.includes(day))
    return false;
  if (disabledPeriod) {
    const currentDate = new Date(year, month - 1, day);
    if ((disabledPeriod.start <= currentDate) && (currentDate <= disabledPeriod.end)) {
      return false
    }
  }
  if (disabledDates && disabledDates.length)
    return !disabledDates.some(date =>
      date.getFullYear() === year
      && date.getMonth() === month - 1
      && date.getDate() === day
    )

  return true
};

export const ItskDatePickerCalendar: React.FC<Props> = ({disabledTo, disabledFrom, disabledDates, disabledDays, disabledPeriod}) => {
  const {state, dispatch} = useContext(ContextDatepicker);
  const {year, month, day, isMonthListToggled, isYearListToggled, inputMonth} = state;

  const monthName:[string, number][] = useMemo(() => {
    const monthArray:[string, number][] = [];
    const dictionary = state.options.language === 'ru'? RuMonthDictionary : EnMonthDictionary;
    for (let i = 1; i <= 12; i++) {
      monthArray.push([dictionary[i],i])
    }
    return monthArray
  }, []) ;
  const week: string[] = useMemo(() => {
    let weekArray: string[] = [];
    const dictionary = state.options.language === 'ru'? RuWeekDictionary : EnWeekDictionary;
    for (let i = 0; i <= 6; i++) {
      weekArray.push(dictionary[i])
    }
    return weekArray
  }, []);

  const [monthScroll, setMonthScroll] = useState(monthName);
  const [yearScroll, setYearScroll] = useState(year);
  const february = year % 4 === 0 ? 29 : 28;
  const yearList = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const monthList = Array(6).fill(0);


  const handleCurrentMonth = () => {
    const weekDay = new Date(year, month - 1, 1).getDay();
    const currentMonth: (number | null)[][] = [];

    let Counter = 1;

    for (let i = 0; i < 6; i++) {
      currentMonth[i] = [];
      for (let j = 0; j <= 6; j++) {
        if ((i === 0 && (j < weekDay - 1 || weekDay === 0 && j < 6))
         ) {
          currentMonth[i][j] = null;
          continue
        } else if ((i === 5 || i === 4) && Counter > yearList[month - 1]) {
          currentMonth[i][j] = null;
          continue
        }
        currentMonth[i][j] = Counter++
      }
    }
    return currentMonth
  };
  const currentMonth = useMemo(() => handleCurrentMonth(), [day, year, month]);

  const handleMonthScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    if (event.deltaY > 0) {
      setMonthScroll([...monthScroll.slice(1), monthScroll[0]]);
      return
    }
    setMonthScroll([monthScroll[11], ...monthScroll.slice(0, 11)])
  };

  const handleYearScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    if (event.deltaY > 0) {
      setYearScroll(yearScroll + 1);
      return
    }
    setYearScroll(yearScroll - 1)
  };
  const handleSetDate = (row: number, column: number) => {
    const checkDisabledDates = checkRange(year, month , currentMonth[row][column], disabledTo, disabledFrom, disabledDates, disabledDays, disabledPeriod);

    if(!checkDisabledDates || !currentMonth[row][column])
      return;

    if (!+inputMonth) {
      dispatch({
        type: 'SET__ALL__DATES',
        day: currentMonth[row][column]
      });
      dispatch({
        type: 'SET_DATEPICKER_CLOSE',
      })
      return;
    }
    dispatch({
      type: 'SET_DATEPICKER_CLOSE',
    })
    dispatch({
      type: 'SET__DAY',
      value: currentMonth[row][column]
    });
  };

  const monthYearListToggle = (event: React.MouseEvent, row: number, type: 'month' | 'year') => {
      event.stopPropagation();
      if (type === 'month') {
        dispatch({
          type: 'SET__MONTH',
          value: monthScroll[row][1]
        });
        dispatch({
          type: 'TOGGLE__MONTH__LIST',
          value: false
        })
      }
      else if (type === 'year') {
        dispatch({
          type: 'SET__YEAR',
          value: yearScroll + row
        });
        dispatch({
          type: 'TOGGLE__YEAR__LIST',
          value: false
        })
      }

  };
  const scrollMonth = (event: React.WheelEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    dispatch({
      type: 'SCROLL__MONTH',
      eventDeltaY: event.deltaY,
      month: month,
    })
  };
  const style = {width: '100%'};
  return (
    <> {isMonthListToggled || isYearListToggled
      ? <>
          {isMonthListToggled
            ? <div className='datepicker__month justify-content-start container_column'
                   onWheel={event => handleMonthScroll(event)}
                   style={style}>
                {monthList.map((_, row) =>
                  <div key={row}
                       className={`datepicker__month__item ${monthScroll[row][1] === month ? 'datepicker__month__item_active' : ''}`}
                       onClick={(event) => monthYearListToggle(event, row, 'month')}>
                    <span className={`datepicker__month__item__number`}>
                        {monthScroll[row][1] < 10 ? '0' + monthScroll[row][1] : monthScroll[row][1]}
                    </span>
                    {' ' + monthScroll[row][0]}
                  </div>
                )}
              </div>
            : ''}
          {isYearListToggled && +yearScroll
            ? <div className='datepicker__year justify-content-start container_column'
                   onWheel={event => handleYearScroll(event)}
                   style={style}>
                {monthList.map((_, row) =>
                  <div key={row}
                       className={`datepicker__year__item ${yearScroll + row === year ? 'datepicker__year__item_active' : ''}`}
                       onClick={(event) => monthYearListToggle(event, row, 'year')}>
                    {yearScroll + row}
                  </div>
                )}
              </div>
            : ''}
        </>
      : <>
          <div className="datepicker__panel__week">
            {week.map(weekDay =>
              <div key={weekDay} className={classNames('datepicker__panel__week__item',
                {datepicker__panel__week__item__holiday: weekDay === 'Sa' || weekDay === 'Su'})}>
                {weekDay}
              </div>
            )}
          </div>
          <div className="datepicker__picker"
               onWheel={scrollMonth}>
            {monthList.map((_, row) =>
              <div key={week[row]} className='datepicker__picker__week'>
                {week.map((weekDay, column) =>
                {
                  const checkAvailableDates = checkRange( year,
                                                          month,
                                                          currentMonth[row][column],
                                                          disabledTo,
                                                          disabledFrom,
                                                          disabledDates,
                                                          disabledDays,
                                                          disabledPeriod,
                                                          );
                  return  <div key={row + column}
                               onClick={() => handleSetDate(row, column)}
                               tabIndex={0}
                               className={classNames('datepicker__picker__day', {
                                 datepicker__picker__day_active: (
                                     currentMonth[row][column] === day && (row === 1 || row === 2 || row === 3)
                                   )
                                   && checkAvailableDates
                                 ,
                                 datepicker__picker__day_other: !checkAvailableDates,
                                 datepicker__picker__day_weekend: weekDay === 'Sa' || weekDay === 'Su' || weekDay === 'Сб' || weekDay === 'Вс',
                               })}>
                            {currentMonth[row][column]}
                          </div>
                  }
                )}
              </div>
            )}
          </div>
        </>
    }
    </>
  );
};

