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
import React, { useState } from 'react'
import {
  Button,
  ExtendComponentsThemeProvider,
  Fieldset,
  i18nInit,
  Paragraph,
  Popover,
  PopoverContent,
} from '@looker/components'

import it from 'date-fns/locale/it'

import { defaultArgTypes as argTypes } from '../../../../apps/storybook/src/defaultArgTypes'
import type { DayOfWeekNumbers } from '../stories/LocaleSettings'
import { LocaleSettings } from '../stories/LocaleSettings'
import { DateFormat } from '../DateFormat'
import type { FieldDateProps } from './FieldDate'
import { FieldDate } from './FieldDate'

i18nInit()

export default {
  argTypes,
  component: FieldDate,
  title: `Date / FieldDate`,
}

const Template: Story<FieldDateProps & { externalLabel: boolean }> = ({
  externalLabel = true,
  ...args
}) => (
  <ExtendComponentsThemeProvider
    themeCustomizations={{ defaults: { externalLabel } }}
  >
    <FieldDate {...args} />
  </ExtendComponentsThemeProvider>
)

export const Basic = Template.bind({})
Basic.args = {
  defaultValue: new Date('July 25, 2020'),
  label: 'Example',
}

export const Disabled = Template.bind({})
Disabled.args = { ...Basic.args, disabled: true }

export const Required = Template.bind({})
Required.args = { ...Basic.args, required: true }

export const Error = Template.bind({})
Error.args = {
  ...Basic.args,
  validationMessage: { message: 'Error Message', type: 'error' },
}

export const Controlled = () => {
  const [controlledDate, setControlledDate] = useState<any>()

  function handleNextWeekClick() {
    setControlledDate(new Date('03/09/2020'))
  }

  return (
    <Popover
      content={
        <PopoverContent>
          <Button onClick={handleNextWeekClick}>Next Week</Button>
          <FieldDate value={controlledDate} onChange={setControlledDate} />
        </PopoverContent>
      }
    >
      <Button>
        {controlledDate ? (
          <>
            <DateFormat>{controlledDate}</DateFormat>
          </>
        ) : (
          'Select Dates'
        )}
      </Button>
    </Popover>
  )
}

Controlled.parameters = {
  storyshots: { disable: true },
}

export const ControlledFloatingLabelNoValue = () => {
  const [today, setToday] = useState<any>()
  const onClickSelectToday = () => setToday(new Date())
  return (
    <ExtendComponentsThemeProvider
      themeCustomizations={{ defaults: { externalLabel: false } }}
    >
      <Button onClick={onClickSelectToday}>Today</Button>
      <FieldDate
        externalLabel={false}
        label="Controlled"
        value={today}
        onChange={setToday}
      />
    </ExtendComponentsThemeProvider>
  )
}
ControlledFloatingLabelNoValue.parameters = {
  storyshots: { disable: true },
}

export const ControlledFloatingLabel = () => {
  const [today, setToday] = useState<any>(new Date('04/07/1776'))
  const onClickSelectToday = () => setToday(new Date())
  return (
    <ExtendComponentsThemeProvider
      themeCustomizations={{ defaults: { externalLabel: false } }}
    >
      <Button onClick={onClickSelectToday}>Today</Button>
      <FieldDate
        externalLabel={false}
        label="Controlled"
        value={today}
        onChange={setToday}
      />
    </ExtendComponentsThemeProvider>
  )
}

export const FloatingLabel = Template.bind({})
FloatingLabel.args = { ...Basic.args, externalLabel: false }

export const FloatingLabelNoDefaultValue = Template.bind({})
FloatingLabelNoDefaultValue.args = { externalLabel: false, label: 'Example' }
FloatingLabelNoDefaultValue.parameters = {
  storyshots: { disable: true },
}

export const Localized = () => {
  const [date, setDate] = useState<Date | undefined>()
  const [locale, setLocale] = useState(it)
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<DayOfWeekNumbers>(
    locale.options?.weekStartsOn || 0
  )
  const clearDate = () => setDate(undefined)

  return (
    <Fieldset>
      <Paragraph>
        Selected:
        {date && <DateFormat locale={locale}>{date}</DateFormat>}
      </Paragraph>

      <FieldDate
        onChange={setDate}
        firstDayOfWeek={firstDayOfWeek}
        locale={locale}
        key={locale.code}
        m="small"
      />
      <LocaleSettings
        setLocale={setLocale}
        firstDayOfWeek={firstDayOfWeek}
        setFirstDayOfWeek={setFirstDayOfWeek}
        clearDate={clearDate}
      />
    </Fieldset>
  )
}

Localized.parameters = {
  storyshots: { disable: true },
}
