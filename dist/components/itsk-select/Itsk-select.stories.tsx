import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';

import {ItskSelect, ItskSelectProps} from './itsk-select'
import {IconsSprite} from '../itsk-icon/IconsSprite'
import {action} from "@storybook/addon-actions";

const size = 100;
// @ts-ignore
const textItems = Array.apply(null, {length: size}).map((v: any, i: any) => `Item ${i}`);
const values =  [
  {value: ['val1'], view: 'option1'},
  {value: 'val2', view: 'option2'},
  {value: 'val3', view: 'option3'},
  {value: 'val4', view: 'option4'},
  {value: 'val5', view: 'option5'},
  {value: 'val6', view: 'option6'},
  {value: 'val7', view: 'option7'},
  {value: 'val8', view: 'option8'},
  {value: 'val9', view: 'option9'},
  {value: 'val10', view: 'option10'},
];
export default {
  title: 'Components/ItskSelect',
  component: ItskSelect,

} as Meta

const Template: Story<ItskSelectProps> = (args) => {
  return (
    <>
      <IconsSprite/>
      <ItskSelect {...args}/>
    </>
  )
}

export const SelectWithTextItems = Template.bind({})
SelectWithTextItems.args = {
  items: textItems,
  multiple: true,
  selected: true,
  initialValue: ['Item 1'],
  selectCallback: action('click')
}
export const SelectWithObjectItem = Template.bind({})
SelectWithObjectItem.args = {
  items: values,
  multiple: true,
  textRef: 'view',
  valueRef: 'value',
  headerType: "viewBlock",
  style: {width: 400},
  selected: true,
  placeholder: 'Placeholder',
  selectCallback: action('click')
}
export const Select = Template.bind({})
Select.args = {
  items: [1,2],
  multiple: true,
  selected:true,
  selectCallback: action('click')
}
