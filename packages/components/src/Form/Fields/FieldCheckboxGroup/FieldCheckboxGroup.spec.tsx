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
import 'jest-styled-components'
import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from '@looker/components-test-utils'
import map from 'lodash/map'
import { fieldOptions } from '../../../__mocks__/CheckboxRadio'
import { FieldCheckboxGroup } from './FieldCheckboxGroup'

const fieldCheckboxProps = {
  defaultValue: ['swiss', 'cheddar'],
  id: '1',
  name: 'group1',
  options: fieldOptions,
}

test('FieldCheckboxGroup render a list of checkbox', () => {
  const extractCheckboxFromDomList = (list: HTMLElement) => {
    const options = list.getElementsByTagName('label')
    return map(options, (el: HTMLElement) => {
      return el.textContent
    })
  }

  const renderListContent = () => {
    renderWithTheme(<FieldCheckboxGroup {...fieldCheckboxProps} />)
    return screen.getByTestId('checkbox-list')
  }

  const view = renderListContent()
  expect(extractCheckboxFromDomList(view)).toEqual([
    'Cheddar',
    'Gouda',
    'Swiss',
    'Roquefort',
  ])
})

test('FieldCheckboxGroup checkbox onChange is working as expected', () => {
  const handleChange = jest.fn()

  renderWithTheme(
    <FieldCheckboxGroup
      {...fieldCheckboxProps}
      defaultValue={[]}
      onChange={handleChange}
    />
  )
  const Cheddar = screen.getByLabelText('Cheddar')
  const Gouda = screen.getByLabelText('Gouda')

  fireEvent.click(Cheddar)

  expect(handleChange).toHaveBeenCalledWith(['cheddar'])

  fireEvent.click(Gouda)

  expect(handleChange).toHaveBeenCalledWith(['cheddar', 'gouda'])
})
