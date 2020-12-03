import {CSSProperties} from "react";
import React from 'react';

type MeasurePropertyValue = number | string;

export interface IBaseComponentProps {
    className?: string
    style?: CSSProperties
    children?: React.ReactNode
}

export interface IWidthControl{
    minWidth?: MeasurePropertyValue
    maxWidth?: MeasurePropertyValue
    width?: MeasurePropertyValue
}

export interface IHeightControl{
    minHeight?: MeasurePropertyValue
    maxHeight?: MeasurePropertyValue
    height?: MeasurePropertyValue
}

export interface IFlexControl{
    flexGrow?: number
    flexShrink?: number
    flexBasis?: MeasurePropertyValue
}
