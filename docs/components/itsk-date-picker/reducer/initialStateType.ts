import {CSSProperties} from 'react';
import {ItskIconType} from '../../itsk-icon/icon-type';
import {DisabledPeriodType} from '../util/date-picker-types';

type alignDirectionType = 'right' | 'left'
export type optionsType = {
  alignDirection: alignDirectionType,
  fixed: boolean,
  canClose: boolean,
  shouldClose?: boolean,
  showClear: boolean,
  icon: ItskIconType,
  disabled: boolean,
  maxYearDate: string,
  minYearDate: string,
  showToday: boolean,
  showTime: boolean,
  activeInputState?: boolean
  datepickerInputFieldClassName?: string
  datepickerInputFieldStyle?: CSSProperties | null,
  language?: string,
}
export type InitialStateType = {
  options: optionsType
  day: number
  month: number
  year: number
  hours: number
  minutes: number
  isDatepickerToggled: boolean
  isMonthListToggled: boolean
  isYearListToggled: boolean
  inputDay: string
  inputMonth: string
  inputYear: string
  inputHours: string
  inputMinutes: string
  borderReady: boolean
  defaultDate: Date | null,
  clearButtonClickAnnounce: boolean
  setDefaultTime: boolean
  disabledDays: number[]
  disabledDates: Date[],
  disabledPeriod: DisabledPeriodType | null
  isDatepickerClosed: boolean
}
