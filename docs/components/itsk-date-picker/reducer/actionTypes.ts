import { optionsType } from "./initialStateType";
import {DisabledPeriodType} from '../util/date-picker-types';

type setOptions = {
    type: 'SET__OPTIONS',
    options: optionsType
}
type setDay = {
    type: 'SET__DAY'
    value: number | null
}
type setMonth = {
    type: 'SET__MONTH'
    value: number
}
type setYear = {
    type: 'SET__YEAR'
    value: number
}
type setActiveInputState = {
    type: 'SET__ACTIVE__INPUT__STATE',
    state: boolean
}
type scrollDay = {
    type: 'SCROLL__DAY'
    eventDeltaY: number,
    day: number,
    daysInCurrentMonth: number
}
type scrollMonth = {
    type: 'SCROLL__MONTH'
    eventDeltaY: number,
    month: number,
    popup?: boolean
}
type scrollYear = {
    type: 'SCROLL__YEAR'
    eventDeltaY: number,
    year: number,
    popup?: boolean
}
type clearDate = {
    type: 'CLEAR__DATE'
}
type toggleMonthList = {
    type: 'TOGGLE__MONTH__LIST'
    value?: boolean
}
type toggleYearList = {
    type: 'TOGGLE__YEAR__LIST'
    value?: boolean
}
type getCurrentTime = {
    type: 'GET__CURRENT__TIME'
}
type toggleDatepicker = {
    type: 'TOGGLE__DATEPICKER'
    value: boolean
}
type setInputValue = {
    type: 'SET__INPUT__VALUE'
    value: string
    fieldName: string
}
type setDefaultDate = {
    type: 'SET__DEFAULT__DATE'
    defaultDate: Date | null
}

type setAllDates = {
    type: 'SET__ALL__DATES'
    day: number | null
}
type updateValidInputValues = {
    type: 'UPDATE__INPUT__VALUES'
    day?: string
    month?: string
    year?: string
}
type setInputActive = {
    type: 'SET__INPUT__ACTIVE'
}
type setDisabledDays = {
    type: 'SET__DISABLED__DAYS'
    date: number[]
}
type setDisabledDates = {
    type: 'SET__DISABLED__DATES'
    date: Date[]
}
type setDisabledPeriod = {
    type: 'SET__DISABLED__PERIOD',
    disabledPeriod: DisabledPeriodType
}
type setDatepickerClose = {
    type: 'SET_DATEPICKER_CLOSE',
}

export type ActionTypes =
    setOptions |
    setDay |
    setMonth |
    setYear |
    scrollDay |
    scrollMonth |
    scrollYear |
    clearDate |
    toggleMonthList |
    toggleYearList |
    getCurrentTime |
    toggleDatepicker |
    setInputValue |
    setAllDates |
    updateValidInputValues |
    setInputActive |
    setActiveInputState |
    setDefaultDate |
    setDisabledDays |
    setDisabledDates |
    setDisabledPeriod |
    setDatepickerClose


