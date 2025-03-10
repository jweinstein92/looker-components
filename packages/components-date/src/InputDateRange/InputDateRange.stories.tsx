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
import type { RangeModifier } from 'react-day-picker'
import {
  Button,
  List,
  ListItem,
  Popover,
  PopoverContent,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from '@looker/components'
import { defaultArgTypes as argTypes } from '../../../../apps/storybook/src/defaultArgTypes'
import { VIEWPORT_MAP } from '../../../components/src/utils-storybook/viewportMap'
import { DateFormat } from '../DateFormat'
import type { InputDateRangeProps } from './InputDateRange'
import { InputDateRange } from './InputDateRange'

export default {
  argTypes,
  component: InputDateRange,
  title: 'Date / InputDateRange',
}

const Template: Story<InputDateRangeProps> = args => (
  <InputDateRange {...args} />
)

export const Basic = Template.bind({})
Basic.args = {
  defaultValue: {
    from: new Date('July 25, 2020'),
    to: new Date('August 5, 2020'),
  },
}

export const Disabled = Template.bind({})
Disabled.args = {
  defaultValue: {
    from: new Date('Jun 7, 2000'),
    to: new Date('Jun 19, 2000'),
  },
  disabled: true,
}

export const ReadOnly = Template.bind({})
ReadOnly.args = {
  defaultValue: {
    from: new Date('Jun 7, 2000'),
    to: new Date('Jun 19, 2000'),
  },
  readOnly: true,
}

export const MobileUI = Template.bind({})
MobileUI.args = {
  defaultValue: {
    from: new Date('Jun 7, 2000'),
    to: new Date('Jun 19, 2000'),
  },
  readOnly: true,
}

MobileUI.parameters = {
  storyshots: { disable: true },
  viewport: {
    defaultViewport: 'mobile',
    viewports: VIEWPORT_MAP,
  },
}

export const TimeframeFilter = () => {
  const startDate = new Date()
  startDate.setDate(9)
  const endDate = new Date()
  endDate.setDate(15)

  const [controlledDateRange, setControlledDateRange] = useState<
    Partial<RangeModifier>
  >()

  return (
    <Popover
      content={
        <PopoverContent>
          <Tabs defaultIndex={1}>
            <TabList>
              <Tab>Preset</Tab>
              <Tab>Custom</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <List>
                  <ListItem>Today</ListItem>
                  <ListItem>Yesterday</ListItem>
                  <ListItem>Last 7 Days</ListItem>
                  <ListItem>Last 14 Days</ListItem>
                  <ListItem>Last 90 Days</ListItem>
                  <ListItem>Year To Date</ListItem>
                </List>
              </TabPanel>
              <TabPanel>
                <InputDateRange
                  value={controlledDateRange}
                  onChange={setControlledDateRange}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </PopoverContent>
      }
    >
      <Button>
        {controlledDateRange ? (
          <>
            <DateFormat>{controlledDateRange.from}</DateFormat> &mdash;{' '}
            <DateFormat>{controlledDateRange.to}</DateFormat>
          </>
        ) : (
          'Select Dates'
        )}
      </Button>
    </Popover>
  )
}

TimeframeFilter.parameters = {
  storyshots: { disable: true },
}
