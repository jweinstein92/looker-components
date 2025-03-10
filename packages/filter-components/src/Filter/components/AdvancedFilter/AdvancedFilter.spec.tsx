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
import { AdvancedFilter } from './AdvancedFilter'
import { renderWithTheme } from '@looker/components-test-utils'
import { screen } from '@testing-library/react'
import React from 'react'

const renderAdvancedFilter = (props?: any) => {
  return renderWithTheme(
    <AdvancedFilter
      updateAST={jest.fn()}
      expressionType="string"
      validationMessage={{
        message: 'test error',
      }}
      name="test filter"
      ast={{
        type: 'string',
        value: 'testexpression',
      }}
      changeFilter={jest.fn()}
      allowMultipleValues={true}
      {...props}
    />
  )
}

describe('Advanced filters', () => {
  describe('add button', () => {
    it('should render the add button', () => {
      renderAdvancedFilter()
      const addButtonIcon = screen.queryByText('Add')
      expect(addButtonIcon).toBeInTheDocument()
    })

    it('should not render the add button when allowMultipleOptions is false', () => {
      renderAdvancedFilter({
        allowMultipleOptions: false,
      })
      const addButtonIcon = screen.queryByRole('img')
      expect(addButtonIcon).not.toBeInTheDocument()
    })

    it('should not render the add button when the field is a parameter', () => {
      renderAdvancedFilter({
        allowMultipleOptions: false,
        field: {
          paremeter: true,
        },
      })
      const addButtonIcon = screen.queryByRole('img')
      expect(addButtonIcon).not.toBeInTheDocument()
    })
  })
})
