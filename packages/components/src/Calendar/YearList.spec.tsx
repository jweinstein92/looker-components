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

import en from 'date-fns/locale/en-US'
import React from 'react'
import { renderWithTheme } from '@looker/components-test-utils'
import { screen } from '@testing-library/react'
import type { YearListProps } from './YearList'
import { YearList } from './YearList'

describe('YearList', () => {
  const date = new Date('January 12, 2022')
  const defaultProps: YearListProps = {
    baseMonth: date,
    currentDate: date,
    locale: en,
    onMonthChange: jest.fn(),
    onMonthClick: jest.fn(),
    selectedMonth: date,
    setBaseMonth: jest.fn(),
  }

  test('renders 10 years before & after', () => {
    renderWithTheme(<YearList {...defaultProps} />)
    const first = screen.getByText('2012')
    const last = screen.getByText('2032')
    expect(first).toBeVisible()
    expect(last).toBeVisible()
    // Only 3 years fully rendered
    expect(screen.getAllByRole('button')).toHaveLength(36)
  })
})
