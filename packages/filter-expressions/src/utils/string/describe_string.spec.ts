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
import type { FilterModel } from '../../types'
import { i18nInit } from '../i18n'
import { describeString } from './describe_string'

describe('String summary', () => {
  beforeEach(() => i18nInit())

  it('returns empty string for an invalid item type', () => {
    const item: FilterModel = {
      id: '1',
      type: 'what',
      is: false,
    }
    expect(describeString(item)).toBe('')
  })

  describe('when type of filter is `match`', () => {
    describe('and is including', () => {
      describe('and values do not contain special characters', () => {
        it('returns a string containing all values, unquoted, and separated by `or`', () => {
          const item: FilterModel = {
            is: true,
            id: '1',
            type: 'match',
            value: ['value1', 'value2'],
          }
          expect(describeString(item)).toBe('is value1 or value2')
        })
      })

      describe('and values contain special characters', () => {
        it('returns a string containing all values, unquoted, and separated by `or`', () => {
          const item: FilterModel = {
            is: true,
            id: '1',
            type: 'match',
            value: ['value1"', 'value2,'],
          }
          expect(describeString(item)).toBe('is "value1"" or "value2,"')
        })
      })
    })

    describe('and is excluding', () => {
      describe('and values do not contain special characters', () => {
        it('returns a string containing all values, unquoted, and separated by `or`', () => {
          const item: FilterModel = {
            is: false,
            id: '1',
            type: 'match',
            value: ['value1', 'value2'],
          }
          expect(describeString(item)).toBe('is not value1 or value2')
        })
      })

      describe('and values contain special characters', () => {
        it('returns a string containing all values, unquoted, and separated by `or`', () => {
          const item: FilterModel = {
            is: false,
            id: '1',
            type: 'match',
            value: ['value1"', 'value2,'],
          }
          expect(describeString(item)).toBe('is not "value1"" or "value2,"')
        })
      })
    })
  })
})
