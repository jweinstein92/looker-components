/*

 MIT License

 Copyright (c) 2022 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

import React, { useState } from 'react'
import type { Story } from '@storybook/react/types-6-0'
import { Select } from '../Select'
import { Space } from '../../../Layout'
import { Text } from '../../../Text'
import { defaultArgTypes as argTypes } from '../../../../../../apps/storybook/src/defaultArgTypes'
import type { InputColorProps } from './InputColor'
import { InputColor } from './InputColor'

const Template: Story<InputColorProps> = args => <InputColor {...args} />

export default {
  argTypes,
  component: InputColor,
  title: 'InputColor',
}

export const Basic = Template.bind({})
Basic.args = {}

export const ColorChosen = Template.bind({})
ColorChosen.args = {
  defaultValue: 'purple',
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...ColorChosen.args,
  disabled: true,
}

export const DisabledNoValue = Template.bind({})
DisabledNoValue.args = {
  ...Basic.args,
  disabled: true,
}

export const ReadOnly = Template.bind({})
ReadOnly.args = {
  ...ColorChosen.args,
  readOnly: true,
}

export const ControlledColor = () => {
  const [color, setColor] = useState('red')

  function handleChange(value: string) {
    setColor(value)
  }

  function handleColorChange(e: React.FormEvent<HTMLInputElement>) {
    setColor(e.currentTarget.value)
  }

  return (
    <Space>
      <Select
        options={[{ value: 'green' }, { value: 'purple' }, { value: 'red' }]}
        value={color}
        onChange={handleChange}
        autoResize
      />
      <InputColor value={color} onChange={handleColorChange} />
      <Text>{color}</Text>
    </Space>
  )
}

ControlledColor.parameters = {
  storyshots: { disable: true },
}
