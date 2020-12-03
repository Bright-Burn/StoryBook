import React, {useContext, useEffect, useRef} from 'react';
import {ContextDatepicker} from "../reducer/reducer";
import {ItskIcon} from '../../itsk-icon/itskIcon';

interface Props {

}

export const ItskDateInput: React.FC<Props> = ({}) => {
  const {state, dispatch} = useContext(ContextDatepicker);
  const { year,
          month,
          day,
          options,
          isDatepickerToggled,
          inputDay,
          inputMonth,
          inputYear,
          inputHours,
          inputMinutes,
          // borderReady
          } = state;

  const daysInCurrentMonth = (new Date(year, month, 1).getTime() - new Date(year, month - 1, 1).getTime()) / 1000 / 3600 / 24;
  const dayInputEl = useRef<HTMLInputElement | null>(null);
  const monthInputEl = useRef<HTMLInputElement | null>(null);
  const yearInputEl = useRef<HTMLInputElement | null>(null);
  const minutesInputEl = useRef<HTMLInputElement | null>(null);
  const hoursInputEl = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (yearInputEl.current && isDatepickerToggled && dayInputEl.current) {
      dayInputEl.current.focus();
      dayInputEl.current.select()
    }
  }, [isDatepickerToggled]);

  const handleValidate = (value: any,
                          maxValidValueOfFirstDateChar: string | number,
                          maxValidValueOfDate: number,
                          isYear = false,
                          isHourOrMinutes = false): string | undefined=> {
    if (!isNaN(value) && value[0] > maxValidValueOfFirstDateChar && value < maxValidValueOfDate && !isYear) {
      return '0' + value[0];
    } else if (!isNaN(value) && value > maxValidValueOfDate || value < 0) {
      return
    } else if (value === '') {
      return value;
    } else if (isNaN(value)) {
      return
    } else if (!isNaN(value) && value === '00' && !isHourOrMinutes) {
      return
    } else if (!isNaN(value) && isYear) {
      switch (value.length) {
        case 1:
          if (value < options.minYearDate[0] || value > options.maxYearDate[0])
            return;
          break;
        case 2:
          if (value > options.maxYearDate.slice(0, 2) || value < options.minYearDate.slice(0, 2))
            return;
          break;
        case 3:
          if (value > options.maxYearDate.slice(0, 3) || value < options.minYearDate.slice(0, 3))
            return;
          break;
        case 4:
          if (value > options.maxYearDate || value < options.minYearDate)
            return;
          break
      }
    }
    return value;
  };
  const onChange = (event:  React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    let validValue: string | undefined= '';
    if (target.id === "day") {
       validValue = handleValidate(target.value, daysInCurrentMonth.toString()[0], daysInCurrentMonth);
      if (validValue && validValue.toString().length === 2 && monthInputEl.current) {
        monthInputEl.current.focus();
        monthInputEl.current.select()
      }
    }
    else if (target.id === "month") {
     validValue = handleValidate(target.value, 1, 12);
      if (validValue && validValue.toString().length === 2 && yearInputEl.current) {
        yearInputEl.current.focus();
        yearInputEl.current.select()
      }
    }
    else if (target.id === "year") {
     validValue = handleValidate(target.value, 2, +options.maxYearDate, true);
      if (validValue && validValue.toString().length === 4 && hoursInputEl.current) {
        hoursInputEl.current.focus();
        hoursInputEl.current.select()
      }
    }
    else if (target.id === "hours") {
     validValue = handleValidate(target.value, 2, 24, false, true);
      if (validValue && validValue.toString().length === 2 && isDatepickerToggled && minutesInputEl.current) {
        minutesInputEl.current.focus();
        minutesInputEl.current.select()
      }
    }
    else if (target.id === "minutes")
     validValue = handleValidate(target.value, 6, 60, false, true);
    if (validValue)
      dispatch({
        type: 'SET__INPUT__VALUE',
        value: validValue,
        fieldName: target.id
      })
  };
  const onWheel = (event: React.WheelEvent<HTMLSpanElement>) =>{
    if (options.disabled)
      return;
    const target = event.target as HTMLDivElement;
    if (target.id === "spanDay")
      dispatch({
        type: 'SCROLL__DAY',
        eventDeltaY: event.deltaY,
        day: day,
        daysInCurrentMonth: daysInCurrentMonth
      });
    else if (target.id === "spanMonth")
      dispatch({
        type: 'SCROLL__MONTH',
        eventDeltaY: event.deltaY,
        month: month,
      });
    else if (target.id === "spanYear")
      dispatch({
        type: 'SCROLL__YEAR',
        eventDeltaY: event.deltaY,
        year: year,
      })
    };
  const handleSelectWhenFocused = (event: React.FocusEvent ) => {
    const target = event.target as HTMLInputElement;
    target.select()
  };
  const clearDate = () => {
    dispatch({
      type: 'CLEAR__DATE'
    })
  };
  const handleStopPropagation = ( event: React.MouseEvent ) => {
    event.stopPropagation()
  };

  const handleSetInputActive = () => {
    if (!options.activeInputState)
    dispatch({
      type: 'SET__INPUT__ACTIVE'
    })
  };

  return (
    <div className={`datepicker__input  datepicker__input_show-time ${options.datepickerInputFieldClassName} ${isDatepickerToggled ? 'picker-input_active' : ''}`}
         onClick={handleSetInputActive}
         style={options.datepickerInputFieldStyle? options.datepickerInputFieldStyle : {}}
    >
        {options.icon ? <ItskIcon icon={options.icon} className={'datepicker__button datepicker__button_open icon'}/> : null}
        {options.activeInputState
          && <>
            {isDatepickerToggled
              ? <input className='datepicker__input--react'
                       type="text"
                       value={inputDay}
                       ref={dayInputEl}
                       id="day"
                       onFocus={handleSelectWhenFocused}
                       onChange={onChange}
                       onClick={handleStopPropagation}/>
              : <span className='datepicker__input-part'
                      tabIndex={0}
                      id='spanDay'
                      onWheel={onWheel}>
                    {inputDay}
                </span>
            }
            <span className='datepicker__input-part'>.</span>

            {isDatepickerToggled
              ? <input className='datepicker__input--react'
                       type="text"
                       value={inputMonth}
                       tabIndex={0}
                       ref={monthInputEl}
                       id='month'
                       onFocus={handleSelectWhenFocused}
                       onChange={onChange}
                       onClick={handleStopPropagation}/>
              : <span className='datepicker__input-part'
                      tabIndex={0}
                      id='spanMonth'
                      style={{userSelect: 'all'}}
                      onWheel={onWheel}>
                    {inputMonth}
                </span>
            }
            <span className='datepicker__input-part'>.</span>

            {isDatepickerToggled
              ? <input className='datepicker__input--react datepicker__input--react-year'
                       type="text"
                       value={inputYear}
                       ref={yearInputEl}
                       tabIndex={0}
                       id='year'
                       onFocus={handleSelectWhenFocused}
                       onChange={onChange}
                       onClick={handleStopPropagation}/>
              : <span className='datepicker__input-part'
                      tabIndex={0}
                      id='spanYear'
                      style={{userSelect: 'all'}}
                      onWheel={onWheel}>
                   {inputYear}
                 </span>
            }
            {options.showTime
              ? <>
                  <span className='datepicker__input-part'>&ensp;</span>

                  {isDatepickerToggled
                    ? <input className='datepicker__input--react '
                             type="text"
                             value={inputHours}
                             tabIndex={0}
                             ref={hoursInputEl}
                             id='hours'
                             onFocus={handleSelectWhenFocused}
                             onChange={onChange}
                           onClick={handleStopPropagation}/>
                    : <span className='datepicker__input-part'>
                        {inputHours}
                      </span>
                  }
                  <span className='datepicker__input-part'>:</span>
                  {isDatepickerToggled
                    ? <input className='datepicker__input--react margin-r-2'
                             type="text"
                             value={inputMinutes}
                             tabIndex={0}
                             ref={minutesInputEl}
                             id='minutes'
                             onFocus={handleSelectWhenFocused}
                             onChange={onChange}
                           onClick={handleStopPropagation}/>
                    : <span className='datepicker__input-part margin-r-1'>
                          {inputMinutes}
                      </span>
                  }
                </>
              : null}
            </>}

      {options.showClear
          ?  <ItskIcon icon={'x-erase-clear-circle-filled'} className={'datepicker__button datepicker__button_clear icon'} onClick={clearDate}/>
          : null}
    </div>
  );
};

