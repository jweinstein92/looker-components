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
import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from '@looker/components-test-utils'
import en from 'date-fns/locale/en-US'
import ital from 'date-fns/locale/it'
import ko from 'date-fns/locale/ko'
import type { RangeModifier } from 'react-day-picker'
import { InputDateRange } from './InputDateRange'

const realDateNow = Date.now.bind(global.Date)

beforeEach(() => {
  /* eslint-disable-next-line @typescript-eslint/unbound-method */
  global.Date.now = jest.fn(() => 1580567580000)
})

afterEach(() => {
  /* eslint-disable-next-line @typescript-eslint/unbound-method */
  global.Date.now = realDateNow // reset Date.now mock
  jest.clearAllMocks()
})

const ControlledInputDateRange = () => {
  const [value, setValue] = useState<Partial<RangeModifier> | undefined>({
    from: new Date('June 3, 2019'),
    to: new Date('June 9, 2019'),
  })
  return (
    <>
      <button
        onClick={() =>
          setValue({
            from: new Date('June 5, 2019'),
            to: new Date('June 15, 2019'),
          })
        }
      >
        June 5 - 15, 2019
      </button>
      <button
        onClick={() =>
          setValue({
            from: new Date('January 1, 2012'),
            to: new Date('February 15, 2012'),
          })
        }
      >
        January 1 - February 15, 2012
      </button>
      <button onClick={() => setValue({ from: new Date('February 9, 2021') })}>
        From: February 9, 2021
      </button>
      <InputDateRange
        value={value}
        onChange={(date?: Partial<RangeModifier> | undefined) => setValue(date)}
      />
    </>
  )
}

test('value can be controlled externally', () => {
  renderWithTheme(<ControlledInputDateRange />)

  expect(screen.getByDisplayValue('06/03/2019')).toBeInTheDocument()
  fireEvent.click(screen.getByText('June 5 - 15, 2019')) // helper isDateRangeInView returns true
  expect(screen.getByDisplayValue('06/15/2019')).toBeInTheDocument()
  fireEvent.click(screen.getByText('January 1 - February 15, 2012')) // helper isDateRangeInView returns false
  expect(screen.getByDisplayValue('01/01/2012')).toBeInTheDocument()
})

test('user can change the selected date via text input field', () => {
  renderWithTheme(<ControlledInputDateRange />)

  expect(screen.getByText('June 2019')).toBeInTheDocument()

  const FromTextInput = screen.getByDisplayValue('06/03/2019')
  const ToTextInput = screen.getByDisplayValue('06/09/2019')
  fireEvent.focus(ToTextInput) // execute helper toggleActiveDateInput
  fireEvent.blur(ToTextInput) // execute helper toggleActiveDateInput
  fireEvent.focus(FromTextInput) // execute helper toggleActiveDateInput
  fireEvent.change(FromTextInput, { target: { value: '01/01/2012' } })
  fireEvent.blur(FromTextInput) // update value on blur

  expect(screen.getByText('January 2012')).toBeInTheDocument()
})

test('navigates from month to month', () => {
  const mockProps = {
    onChange: jest.fn(),
    value: {
      from: new Date('June 3, 2019'),
      to: new Date('June 9, 2019'),
    },
  }
  renderWithTheme(<InputDateRange {...mockProps} />)
  expect(screen.getByText('June 2019')).toBeInTheDocument()
  fireEvent.click(screen.getByText('Previous Month'))
  expect(screen.getByText('May 2019')).toBeInTheDocument()
  fireEvent.click(screen.getByText('May 2019')) // jump to "now" (mocked date.now: February 2020)
  fireEvent.click(screen.getByText('Next Month'))
  expect(screen.getByText('March 2020')).toBeInTheDocument()
})

test('navigates from month to month by clicking calendar overflow dates', () => {
  // "calendar overflow" refers to greyed out days that aren't technically
  // in the currently viewed month
  const mockProps = {
    onChange: jest.fn(),
    value: {
      from: new Date('June 3, 2019'),
      to: new Date('June 9, 2019'),
    },
  }
  renderWithTheme(<InputDateRange {...mockProps} />)
  expect(screen.getByText('June 2019')).toBeInTheDocument()
  fireEvent.click(screen.getAllByText('26')[0]) // May 26th
  expect(screen.getByText('May 2019')).toBeInTheDocument()
})

test('calls onChange prop when a day is clicked', () => {
  const mockProps = {
    defaultValue: {
      from: new Date('June 3, 2019'),
      to: new Date('June 9, 2019'),
    },
    onChange: jest.fn(),
  }
  renderWithTheme(<InputDateRange {...mockProps} />)
  expect(mockProps.onChange).not.toHaveBeenCalled()

  fireEvent.click(screen.getAllByText('4')[0]) // the 4th day of the month
  fireEvent.click(screen.getAllByText('21')[0]) // the 21st day of the month
  expect(mockProps.onChange.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        Object {
          "from": 2019-06-04T19:00:00.000Z,
          "to": 2019-06-09T07:00:00.000Z,
        },
      ],
      Array [
        Object {
          "from": 2019-06-04T19:00:00.000Z,
          "to": 2019-06-21T19:00:00.000Z,
        },
      ],
    ]
  `)
})

test('gracefully accepts partial date range objects', () => {
  renderWithTheme(<ControlledInputDateRange />)
  fireEvent.click(screen.getByText('From: February 9, 2021')) // helper isDateRangeInView returns false
  expect(screen.getByText('February 2021')).toBeInTheDocument()
})

test('selects a single day when clicking on one of the date endpoints', () => {
  const mockProps = {
    defaultValue: {
      from: new Date('June 3, 2019 12:00'),
      to: new Date('June 9, 2019 12:00'),
    },
    onChange: jest.fn(),
  }
  renderWithTheme(<InputDateRange {...mockProps} />)
  expect(mockProps.onChange).not.toHaveBeenCalled()

  const date = screen.getAllByText('3')[0] // the 3rd day of the month (beggining of range)
  fireEvent.click(date)
  // both from and to were set to June 3rd
  expect(mockProps.onChange).toHaveBeenCalledWith({
    from: new Date('June 3, 2019 12:00'),
    to: new Date('June 3, 2019 12:00'),
  })
})

it('user can clear the selected date by deleting text input content', () => {
  const mockProps = {
    defaultValue: {
      from: new Date('June 3, 2019 12:00'),
      to: new Date('June 9, 2019 12:00'),
    },
    onChange: jest.fn(),
  }
  renderWithTheme(<InputDateRange {...mockProps} />)
  const FromTextInput = screen.getByTestId('date-from-text-input')
  fireEvent.focus(FromTextInput)
  fireEvent.change(FromTextInput, { target: { value: '' } })
  fireEvent.blur(FromTextInput) // update value on blur
  const ToTextInput = screen.getByTestId('date-to-text-input')
  fireEvent.focus(ToTextInput)
  fireEvent.change(ToTextInput, { target: { value: '' } })
  fireEvent.blur(ToTextInput) // update value on blur

  expect(mockProps.onChange.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        Object {
          "from": 2019-06-09T19:00:00.000Z,
          "to": 2019-06-09T19:00:00.000Z,
        },
      ],
      Array [
        Object {
          "from": undefined,
          "to": undefined,
        },
      ],
    ]
  `)
})

test('extends date range when clicking before current "from" endpoint', () => {
  const mockProps = {
    defaultValue: {
      from: new Date('June 8, 2019 12:00'),
      to: new Date('June 9, 2019 12:00'),
    },
    onChange: jest.fn(),
  }
  renderWithTheme(<InputDateRange {...mockProps} />)
  expect(mockProps.onChange).not.toHaveBeenCalled()

  const newDate = screen.getAllByText('1')[0] // the 1st day of the month (before default date range)
  fireEvent.click(newDate)
  // both from and to were set to June 3rd
  expect(mockProps.onChange).toHaveBeenCalledWith({
    from: new Date('June 1, 2019 12:00'),
    to: new Date('June 9, 2019 12:00'),
  })
})

test('calls onChange prop when a TextInput is modified', () => {
  const mockProps = {
    defaultValue: {
      from: new Date('June 3, 2019'),
      to: new Date('June 9, 2019'),
    },
    onChange: jest.fn(),
  }
  renderWithTheme(<InputDateRange {...mockProps} />)
  const toInput = screen.getByTestId('date-to-text-input') as HTMLInputElement
  const fromInput = screen.getByTestId(
    'date-from-text-input'
  ) as HTMLInputElement

  expect(mockProps.onChange).not.toHaveBeenCalled()

  fireEvent.focus(fromInput)
  fireEvent.change(fromInput, { target: { value: '6/15/2019' } })

  expect(mockProps.onChange).toHaveBeenCalledWith({
    from: new Date('June 15, 2019'),
    to: new Date('June 15, 2019'),
  })

  fireEvent.focus(toInput)
  fireEvent.change(toInput, { target: { value: '6/25/2019' } })

  expect(mockProps.onChange).toHaveBeenCalledWith({
    from: new Date('June 15, 2019'),
    to: new Date('June 25, 2019'),
  })
})

test('updates text input value when day is clicked', () => {
  const mockProps = {
    onChange: jest.fn(),
  }
  renderWithTheme(<InputDateRange {...mockProps} />)

  const fromInput = screen.getByTestId(
    'date-from-text-input'
  ) as HTMLInputElement
  const toInput = screen.getByTestId('date-to-text-input') as HTMLInputElement
  const startDate = screen.getAllByText('2')[0] // the 2nd day of the month (left calendar)
  const endDate = screen.getAllByText('15')[1] // the 15th day of the month (right calendar)

  expect(fromInput).toHaveValue('')
  expect(toInput).toHaveValue('')

  fireEvent.click(startDate)

  expect(fromInput).toHaveValue('02/02/2020')
  expect(toInput).toHaveValue('02/02/2020')

  fireEvent.click(endDate)

  expect(fromInput).toHaveValue('02/02/2020')
  expect(toInput).toHaveValue('03/15/2020')
})

test('defaultValue prop fills TextInputs with correct dates', () => {
  const mockProps = {
    defaultValue: {
      from: new Date('June 3, 2019'),
      to: new Date('June 9, 2019'),
    },
    onChange: jest.fn(),
  }
  renderWithTheme(<InputDateRange {...mockProps} />)
  const fromInput = screen.getByTestId(
    'date-from-text-input'
  ) as HTMLInputElement
  const toInput = screen.getByTestId('date-to-text-input') as HTMLInputElement

  expect(fromInput).toHaveValue('06/03/2019')
  expect(toInput).toHaveValue('06/09/2019')
})

// getByLabelText doesn't return aria-label value not sure how to select the specific date
xtest('defaultValue highlights the correct dates in the Calendar', () => {
  const mockProps = {
    defaultValue: {
      from: new Date('June 3, 2019'),
      to: new Date('June 5, 2019'),
    },
    onChange: jest.fn(),
  }
  renderWithTheme(<InputDateRange {...mockProps} />)

  const dayOne = screen.getByLabelText('Mon Jun 3, 2019')
  const dayTwo = screen.getByLabelText('Tue Jun 4, 2019')
  const dayThree = screen.getByLabelText('Wed Jun 5, 2019')

  const dayBefore = screen.getByLabelText('Sun Jun 2, 2019')
  const dayAfter = screen.getByLabelText('Thu Jun 6, 2019')

  expect(dayOne).toHaveAttribute('aria-selected', 'true')
  expect(dayTwo).toHaveAttribute('aria-selected', 'true')
  expect(dayThree).toHaveAttribute('aria-selected', 'true')

  expect(dayBefore).toHaveAttribute('aria-selected', 'false')
  expect(dayAfter).toHaveAttribute('aria-selected', 'false')
})

test('validates FROM text input to match localized date format', () => {
  const mockProps = {
    defaultValue: {
      from: new Date('June 3, 2019'),
      to: new Date('June 9, 2019'),
    },
    onValidationFail: jest.fn(),
  }
  renderWithTheme(<InputDateRange {...mockProps} />)
  const fromInput = screen.getByTestId(
    'date-from-text-input'
  ) as HTMLInputElement

  fireEvent.change(fromInput, { target: { value: '6/3/2019' } })
  fireEvent.blur(fromInput) // validate on blur

  expect(mockProps.onValidationFail).not.toHaveBeenCalled()

  fireEvent.change(fromInput, { target: { value: 'not-a-valid-date' } })
  fireEvent.blur(fromInput) // validate on blur

  expect(mockProps.onValidationFail).toHaveBeenCalledTimes(1)
})

test('validates TO text input to match localized date format', () => {
  const mockProps = {
    defaultValue: {
      from: new Date('June 3, 2019'),
      to: new Date('June 9, 2019'),
    },
    onValidationFail: jest.fn(),
  }
  renderWithTheme(<InputDateRange {...mockProps} />)
  const toInput = screen.getByTestId('date-to-text-input') as HTMLInputElement

  fireEvent.focus(toInput) // activate `date-to` input to ensure validation reads from correct value
  fireEvent.change(toInput, { target: { value: '6/15/2019' } })
  fireEvent.blur(toInput) // validate on blur

  expect(mockProps.onValidationFail).not.toHaveBeenCalled()

  fireEvent.change(toInput, { target: { value: 'nope-not-valid' } })
  fireEvent.blur(toInput) // validate on blur

  expect(mockProps.onValidationFail).toHaveBeenCalledTimes(1)
})

test('localizes calendar', () => {
  const { container } = renderWithTheme(
    <InputDateRange locale={ital} firstDayOfWeek={1} />
  )

  expect(screen.getByText('febbraio 2020 marzo 2020')).toBeInTheDocument()
  expect(
    // eslint-disable-next-line testing-library/no-container
    (container.querySelector('.DayPicker-WeekdaysRow') as HTMLElement)
      .textContent
  ).toMatchInlineSnapshot(`"lunmarmergiovensabdom"`)
})

describe('localizes text input', () => {
  test('Korean', () => {
    renderWithTheme(
      <InputDateRange
        locale={ko}
        defaultValue={{
          from: new Date(Date.now()),
          to: new Date('May 2, 2020'),
        }}
      />
    )
    expect(screen.getByDisplayValue('2020.02.01')).toBeInTheDocument()
  })
  test('Italian', () => {
    renderWithTheme(
      <InputDateRange
        locale={ital}
        defaultValue={{
          from: new Date(Date.now()),
          to: new Date('May 2, 2020'),
        }}
      />
    )
    expect(screen.getByDisplayValue('01/02/2020')).toBeInTheDocument()
  })
  test('English', () => {
    renderWithTheme(
      <InputDateRange
        locale={en}
        defaultValue={{
          from: new Date(Date.now()),
          to: new Date('May 2, 2020'),
        }}
      />
    )
    expect(screen.getByDisplayValue('02/01/2020')).toBeInTheDocument()
  })
})
