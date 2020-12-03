import React, {CSSProperties, useEffect, useReducer} from 'react';
import {InitialState, Reducer} from "./reducer/reducer";
import {ContextDatepicker} from "./reducer/reducer";
import {ItskDropdown} from "../itsk-dropdown/itsk-dropdown";
import {ItskDateInput} from "./date-picker-input/itsk-date-input";
import {ItskDatePickerPanel} from "./date-picker-panel/itsk-date-picker-panel";
import {checkRange, ItskDatePickerCalendar} from "./date-picker-calendar/itsk-date-picker-calendar";
import {ItskDropdownHeader} from '../itsk-dropdown/itsk-dropdown-header';
import {ItskDropdownContent} from '../itsk-dropdown/itsk-dropdown-content';
import {IBaseComponentProps} from '../common';
import {ItskIconType} from '../itsk-icon/icon-type';
import {DisabledPeriodType} from './util/date-picker-types';

export interface IItskDatePicker extends IBaseComponentProps {
  showToday?: boolean
  showTime?: boolean
  disabled?: boolean
  showIcon?: boolean
  icon?: ItskIconType
  showClear?: boolean
  defaultDate?: Date
  callback: (date: Date | null) => void
  alignDirection?: 'right' | 'left'
  canClose?: boolean
  shouldClose?: boolean
  fixed?: boolean
  maxYearDate?: string
  minYearDate?: string
  datepickerInputFieldClassName?: string
  activeInputState?: boolean
  datepickerInputFieldStyle?: CSSProperties,
  language?: 'ru' | 'eng'
  disabledTo?: Date
  disabledFrom?: Date
  disabledDates?: Date[]
  disabledDays?: number[]
  disabledPeriod?: DisabledPeriodType
}

export const ItskDatePicker: React.FC<IItskDatePicker> = ({
                                                            defaultDate = new Date(),
                                                            callback,
                                                            alignDirection = 'left',
                                                            fixed = false,
                                                            canClose = false,
                                                            showClear = true,
                                                            icon = 'calendar_today-date-filled',
                                                            disabled = false,
                                                            maxYearDate = '2100',
                                                            minYearDate = '1900',
                                                            showToday = true,
                                                            showTime = true,
                                                            activeInputState = true,
                                                            style,
                                                            className = '',
                                                            datepickerInputFieldClassName = '',
                                                            datepickerInputFieldStyle,
                                                            language = 'ru',
                                                            disabledTo,
                                                            disabledFrom,
                                                            disabledDates,
                                                            disabledDays,
                                                            disabledPeriod,
                                                            shouldClose
                                                          }) => {
  const [state, dispatch] = useReducer(Reducer, InitialState);
  const {minutes, day, year, month, hours} = state

  useEffect(() => {
    if (state.clearButtonClickAnnounce) {
      callback(null);
      return
    }
    if (state.year >= +state.options.minYearDate && state.options.activeInputState && checkRange(year, month, day, disabledTo, disabledFrom, disabledDates, disabledDays, disabledPeriod)) {
      const currentDate = new Date(year, month - 1, day, hours || 0, minutes || 0);
      callback(currentDate)
    }
  }, [state.day, state.month, state.year, state.hours, state.minutes, state.options.activeInputState, state.clearButtonClickAnnounce]);

  useEffect(() => {
    dispatch({
      type: 'SET__OPTIONS',
      options: {
        alignDirection,
        fixed,
        canClose,
        showClear,
        icon,
        disabled,
        maxYearDate,
        minYearDate,
        showToday,
        showTime,
        datepickerInputFieldClassName,
        datepickerInputFieldStyle,
        language,
        shouldClose
      }
    })
  }, [alignDirection,
    fixed,
    canClose,
    showClear,
    icon,
    disabled,
    maxYearDate,
    minYearDate,
    showToday,
    showTime,
  ]);

  useEffect(() => {
    dispatch({
      type: 'SET__DEFAULT__DATE',
      defaultDate: defaultDate
    })
  }, []);

  // useEffect(() => {
  //   disabledPeriod
  //   && dispatch({
  //     type: 'SET__DISABLED__PERIOD',
  //     disabledPeriod: disabledPeriod
  //   })
  // }, []);
  //
  // useEffect(() => {
  //   if (disabledDates && disabledDates.length)
  //     dispatch({
  //       type: 'SET__DISABLED__DATES',
  //       date: disabledDates
  //     })
  //
  // }, []);
  //
  // useEffect(() => {
  //   if (disabledDays && disabledDays.length)
  //     dispatch({
  //       type: 'SET__DISABLED__DAYS',
  //       date: disabledDays
  //     })
  //
  // }, []);

  useEffect(() => {
    dispatch({
      type: 'SET__ACTIVE__INPUT__STATE',
      state: activeInputState
    });
  }, [activeInputState]);

  return (
    <ContextDatepicker.Provider value={{dispatch, state}}>
      <div className={`datepicker ${className}`}
           style={style}>
        <ItskDropdown fixed={state.options.fixed}
                      canClose={state.options.canClose}
                      align={state.options.alignDirection}
                      disabled={state.options.disabled}
                      changeToggleState={state.options.shouldClose}
                      callback={toggle => {
                        dispatch({
                          type: 'TOGGLE__DATEPICKER',
                          value: toggle
                        });
                        dispatch({
                          type: 'UPDATE__INPUT__VALUES',
                        })
                      }
                      }>
          <ItskDropdownHeader>
            <ItskDateInput/>
          </ItskDropdownHeader>

          <ItskDropdownContent>
            <div className='datepicker__body datepicker__body_visible container flex-column align-center'
                 style={{width: '100%'}}>
              <ItskDatePickerPanel/>
              <ItskDatePickerCalendar disabledTo={disabledTo} disabledFrom={disabledFrom}
                                      disabledPeriod={disabledPeriod} disabledDays={disabledDays}
                                      disabledDates={disabledDates}/>
            </div>
          </ItskDropdownContent>

        </ItskDropdown>
      </div>
    </ContextDatepicker.Provider>
  );
};

