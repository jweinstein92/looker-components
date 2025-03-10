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
import { renderWithTheme } from '@looker/components-test-utils'
import { screen } from '@testing-library/react'
import { ModalHeader } from './ModalHeader'

describe('ModalHeader', () => {
  test('basic', () => {
    renderWithTheme(<ModalHeader>Heading</ModalHeader>)
    expect(screen.getByText('Heading')).toBeInTheDocument()
  })

  test('has aria-label', async () => {
    renderWithTheme(<ModalHeader aria-label="ARIA label">Heading</ModalHeader>)
    expect(await screen.findByLabelText('ARIA label')).toBeInTheDocument()
  })

  test(`detail as ReactNode`, () => {
    renderWithTheme(
      <ModalHeader detail={<button>x</button>}>Header</ModalHeader>
    )
    expect(screen.getByText('x')).toBeInTheDocument()
  })

  test(`detail has marginY`, () => {
    renderWithTheme(
      <ModalHeader detail={<button>x</button>}>Header</ModalHeader>
    )
    expect(screen.queryByText('x')?.closest('div')).toHaveStyle(
      'margin-top: -0.5rem'
    )
    expect(screen.queryByText('x')?.closest('div')).toHaveStyle(
      'margin-bottom: -0.5rem'
    )
  })
})
