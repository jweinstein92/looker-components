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
import { Box2, ChipButton, InputDateRange, Popover } from '@looker/components'
import React from 'react'
import type { DayRange } from '../../types/day_range'
import { FILTERS_DATE_FORMAT, formatDate } from '../../utils/format_date'

interface DayRangePickerProps {
  value: DayRange
  onChange: (range: DayRange) => void
}

export const DayRangeInput = ({ value, onChange }: DayRangePickerProps) => {
  const handleChange = (d: Partial<DayRange> = {}) => {
    const newFrom = d.from || new Date(Date.now())
    const newTo = d.to || new Date(Date.now())
    const newDateRange = {
      from: new Date(
        newFrom.getFullYear(),
        newFrom.getMonth(),
        newFrom.getDate()
      ),
      to: new Date(newTo.getFullYear(), newTo.getMonth(), newTo.getDate()),
    }
    onChange(newDateRange)
  }

  const formattedValue = `${formatDate(value.from)} \u2013 ${formatDate(
    value.to
  )}`

  return (
    <Popover
      content={
        <Box2 p="u3">
          <InputDateRange
            onChange={handleChange}
            value={value}
            // hardcoding 'yyyy/MM/dd' for legacy reasons
            // eventually this should be replaced with the user's preferred locale
            dateStringFormat={FILTERS_DATE_FORMAT}
          />
        </Box2>
      }
      placement="bottom-start"
    >
      <ChipButton>{formattedValue}</ChipButton>
    </Popover>
  )
}
