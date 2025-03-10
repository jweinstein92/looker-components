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

import React from 'react'
import { renderWithTheme } from '@looker/components-test-utils'
import { ReplaceText } from './ReplaceText'

describe('ReplaceText', () => {
  test('globally replaces a case-insensitive string with JSX', () => {
    const { container } = renderWithTheme(
      <ReplaceText
        match="long"
        replace={(text, index) => <span key={index}>{text}</span>}
      >
        Some LONG text that is long and this is how long it is.
      </ReplaceText>
    )
    expect(container).toMatchInlineSnapshot(`
      <div>
        Some 
        <span>
          LONG
        </span>
         text that is 
        <span>
          long
        </span>
         and this is how 
        <span>
          long
        </span>
         it is.
      </div>
    `)
  })
})
