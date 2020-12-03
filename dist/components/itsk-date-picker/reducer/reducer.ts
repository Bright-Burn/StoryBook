import React from "react";
import {ActionTypes} from "./actionTypes";
import produce, {Draft} from "immer";
import { InitialStateType } from "./initialStateType";

export const InitialState: InitialStateType = {
  options: {
    alignDirection: 'right',
    fixed: false,
    canClose: false,
    showClear: true,
    icon: 'calendar_today-date-filled',
    disabled: false,
    maxYearDate: '2100',
    minYearDate: '1900',
    showToday: true,
    showTime: true,
    activeInputState: true,
    datepickerInputFieldClassName: '',
    datepickerInputFieldStyle: null,
    language: 'ru',
    shouldClose: false
  },
  day: 0,
  month: 0,
  year: 0,
  hours: 0,
  minutes: 0,
  isDatepickerToggled: false,
  isMonthListToggled: false,
  isYearListToggled: false,
  inputDay: '0',
  inputMonth: '0',
  inputYear: '0',
  inputHours: '0',
  inputMinutes: '0',
  borderReady: false,
  defaultDate: null,
  clearButtonClickAnnounce: false,
  setDefaultTime: true,
  disabledDays: [],
  disabledDates: [],
  disabledPeriod: null,
  isDatepickerClosed: false
};
export const addZero = (timeValue: number | string): string => {
  if (timeValue < 10) {
    return '0' + timeValue;
  } else {
    return timeValue + ''
  }
};

export const ContextDatepicker = React.createContext<{ state: InitialStateType, dispatch: React.Dispatch<ActionTypes> }>
(
  {
    state: InitialState,
    dispatch: () => null
  }
);

export const Reducer = (state = InitialState, action: ActionTypes) =>
  produce(state, (draft: Draft<InitialStateType>) => {
    switch (action.type) {
      case "SET__OPTIONS":
        draft.options = {...draft.options, ...action.options};
        break;

      case 'SET__DEFAULT__DATE':
        const defaultDate = action.defaultDate;

        if(!defaultDate)
          break;
        draft.day = defaultDate.getDate();
        draft.month = defaultDate.getMonth() + 1;
        draft.year = defaultDate.getFullYear();
        draft.hours = defaultDate.getHours();
        draft.minutes = defaultDate.getMinutes();
        draft.inputDay = addZero(defaultDate.getDate());
        draft.inputMonth = addZero(defaultDate.getMonth() + 1);
        draft.inputYear = addZero(defaultDate.getFullYear());
        draft.inputHours = addZero(defaultDate.getHours());
        draft.inputMinutes = addZero(defaultDate.getMinutes());
        draft.borderReady = true;
        break;
      case "SET__DAY":
        if (!action.value)
          return;
        draft.setDefaultTime = false;
        draft.clearButtonClickAnnounce = false;
        draft.day = action.value;
        draft.inputDay = addZero(action.value);
        draft.inputMonth =  addZero(draft.month);
        draft.inputYear =  addZero(draft.year);
        break;

      case "SET__MONTH":
        draft.setDefaultTime = false;
        draft.clearButtonClickAnnounce = false;
        draft.month = action.value;
        draft.inputMonth =  addZero(action.value);
        break;
      case "SET__YEAR":
        draft.setDefaultTime = false;
        draft.clearButtonClickAnnounce = false;
        draft.year =  action.value;
        draft.inputYear =  addZero(action.value);
        break;

      case 'SET__ACTIVE__INPUT__STATE':
        draft.options.activeInputState = action.state;
        break;

      case "SET__INPUT__VALUE":
        draft.setDefaultTime = false;
        draft.clearButtonClickAnnounce = false;
        if (action.fieldName === "day") {
          draft.inputDay = action.value;
          if (+action.value)
            draft.day = +action.value;
          break;
        } else if (action.fieldName === "month") {
          draft.inputMonth = action.value;
          if (+action.value)
            draft.month = +action.value;
          break;
        } else if (action.fieldName === "year") {
          draft.inputYear = action.value;
          if (+action.value)
            draft.year = +action.value;
          break;
        } else if (action.fieldName === "hours") {
          draft.inputHours = action.value;
          if (+action.value)
            draft.hours = +action.value;
          break;
        } else if (action.fieldName === "minutes") {
          draft.inputMinutes = action.value;
          if (+action.value)
            draft.minutes = +action.value;
          break;
        }
        break;

      case 'SET__INPUT__ACTIVE':
        draft.options.activeInputState = true;
        break;

      case "SCROLL__DAY":
        draft.setDefaultTime = false;
        draft.clearButtonClickAnnounce = false;
        let day = draft.day;
        if (action.eventDeltaY < 0) {
          day = action.day >= action.daysInCurrentMonth ? 1 : action.day + 1
        } else {
          day = action.day <= 1 ? action.daysInCurrentMonth : action.day - 1
        }
        draft.day = day;
        draft.inputDay = addZero(day);
        break;
      case "SCROLL__MONTH":
        draft.setDefaultTime = false;
        draft.clearButtonClickAnnounce = false;
        let month = draft.month;
        if (action.eventDeltaY < 0) {
          month = action.month >= 12 ? 1 : action.month + 1
        } else {
          month = action.month <= 1 ? 12 : action.month - 1
        }
        draft.month = month;
        draft.inputMonth = action.popup? draft.inputMonth : addZero(month);
        break;
      case "SCROLL__YEAR":
        draft.setDefaultTime = false;
        draft.clearButtonClickAnnounce = false;
        let year = draft.year;
        if (action.eventDeltaY > 0) {
          year = action.year >= +draft.options.minYearDate ? action.year - 1 : action.year
        } else {
          year = action.year <= +draft.options.maxYearDate ? action.year + 1 : action.year
        }
        draft.year = year;
        draft.inputYear = action.popup? draft.inputYear: addZero(year);
        break;

      case 'SET__ALL__DATES':
        if (!action.day)
          return;
        draft.day = action.day;
        draft.month = draft.month;
        draft.year = draft.year;
        draft.minutes = 0;
        draft.hours = 0;
        draft.inputDay = addZero(action.day);
        draft.inputMonth = addZero(draft.month);
        draft.inputYear = addZero(draft.year);
        draft.inputHours = '00';
        draft.inputMinutes = '00';
        draft.clearButtonClickAnnounce = false;
        draft.setDefaultTime = false;
        break;

      case 'UPDATE__INPUT__VALUES':
        if (draft.inputDay.length === 1)
          draft.inputDay = 0 + draft.inputDay;
        if (draft.inputDay.length === 0)
          draft.inputDay = '__';
        if (draft.inputMonth.length === 1)
          draft.inputMonth = 0 + draft.inputMonth;
        if (draft.inputMonth.length === 0)
          draft.inputMonth = '__';
        if (draft.inputYear.length === 0)
          draft.inputYear = '____';
        break;

      case "CLEAR__DATE":
        draft.inputDay = '__';
        draft.inputMonth = '__';
        draft.inputYear = '____';
        draft.inputHours = '__';
        draft.inputMinutes = '__';
        draft.clearButtonClickAnnounce = true;
        draft.setDefaultTime = false;
        break;
      case "TOGGLE__MONTH__LIST":
        draft.isMonthListToggled = action.value !== undefined ? action.value : !draft.isMonthListToggled;
        break;
      case "TOGGLE__YEAR__LIST":
        draft.isYearListToggled = action.value !== undefined ? action.value : !draft.isYearListToggled;
        break;
      case "GET__CURRENT__TIME":
        const time = new Date();
        draft.day = time.getDate();
        draft.month = time.getMonth() + 1;
        draft.year = time.getFullYear();
        draft.hours = time.getHours();
        draft.minutes = time.getMinutes();
        draft.inputDay = addZero(time.getDate());
        draft.inputMonth = addZero(time.getMonth() + 1);
        draft.inputYear = addZero(time.getFullYear());
        draft.inputHours = addZero(time.getHours());
        draft.inputMinutes = addZero(time.getMinutes());
        draft.setDefaultTime = false;
        break;
      case "TOGGLE__DATEPICKER":
        draft.isDatepickerToggled = action.value;
        draft.isMonthListToggled = false;
        draft.isYearListToggled = false;
        break;
      case 'SET__DISABLED__DAYS':
        draft.disabledDays = action.date;
        break;
      case 'SET__DISABLED__DATES':
        draft.disabledDates = action.date;
        break;
      case 'SET__DISABLED__PERIOD':
        draft.disabledPeriod = action.disabledPeriod;
        break;
      case "SET_DATEPICKER_CLOSE":
        draft.isDatepickerClosed = !draft.isDatepickerClosed
        break;
    }

  });
