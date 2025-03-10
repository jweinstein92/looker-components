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

import type { Story } from '@storybook/react/types-6-0'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button, ButtonGroup, ButtonItem } from '../../../Button'
import { Space } from '../../../Layout'
import { defaultArgTypes as argTypes } from '../../../../../../apps/storybook/src/defaultArgTypes'
import type { FieldRangeSliderProps } from './FieldRangeSlider'
import { FieldRangeSlider } from './FieldRangeSlider'

export default {
  argTypes,
  component: FieldRangeSlider,
  title: 'FieldRangeSlider',
}

const Template: Story<FieldRangeSliderProps> = args => (
  <FieldRangeSlider {...args} />
)

export const Basic = Template.bind({})
Basic.args = {}

export const Disabled = Template.bind({})
Disabled.args = { disabled: true }

export const Steps = Template.bind({})
Steps.args = { max: 1000, min: 100, step: 50 }

Steps.parameters = {
  storyshots: { disable: true },
}

export const Floating = Template.bind({})
Floating.args = { max: 3.7, min: 0.1, step: 0.1 }

Floating.parameters = {
  storyshots: { disable: true },
}

export const ReadOnly = Template.bind({})
ReadOnly.args = { defaultValue: [3, 7], readOnly: true }

ReadOnly.parameters = {
  storyshots: { disable: true },
}

export const Controlled = () => {
  const [controlledValue, setControlledValue] = useState([30, 40])
  const handleChange: (value: number[]) => void = (value: number[]) =>
    setControlledValue(value)

  return (
    <>
      <FieldRangeSlider
        label="Controlled Example"
        description={`${controlledValue[0]} – ${controlledValue[1]}`}
        min={20}
        max={50}
        value={controlledValue}
        onChange={handleChange}
      />
      <Space>
        <Button onClick={() => handleChange([25, 45])}>25 — 45</Button>
        <Button onClick={() => handleChange([30, 37])}>30 — 37</Button>
        <Button onClick={() => handleChange([39, 40])}>39 — 40</Button>
      </Space>
    </>
  )
}

Controlled.parameters = {
  storyshots: { disable: true },
}

export const DashboardFilters = () => {
  const [renderSiblings, setRenderSiblings] = useState(false)
  const [buttonValue, setButtonValue] = useState(['CA'])

  useEffect(() => {
    const timeout = setTimeout(() => setRenderSiblings(true), 1000)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <FilterGrid>
      {renderSiblings && (
        <ButtonGroup value={buttonValue} onChange={setButtonValue}>
          <ButtonItem value="CA">California</ButtonItem>
          <ButtonItem value="AK">Alaska</ButtonItem>
          <ButtonItem value="UT">Utah</ButtonItem>
        </ButtonGroup>
      )}
      <FieldRangeSlider />
    </FilterGrid>
  )
}

DashboardFilters.parameters = {
  storyshots: { disable: true },
}

const FilterGrid = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: 1fr 1fr;
  padding: 30px;
`
