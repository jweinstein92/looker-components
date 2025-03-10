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

import { useCallback, useState } from 'react'
import { useResize } from './useResize'

export const measureElement = (element?: HTMLElement | null) => {
  if (!element) {
    return typeof DOMRect === 'function'
      ? new DOMRect()
      : {
          bottom: 0,
          height: 0,
          left: 0,
          rect: {},
          right: 0,
          toJSON: () => null,
          top: 0,
          width: 0,
          x: 0,
          y: 0,
        }
  }

  return element.getBoundingClientRect()
}

export const useMeasuredElement = (
  element: HTMLElement | null
): [DOMRect, () => void] => {
  const [rect, setRect] = useState(measureElement())

  const refreshDomRect = useCallback(() => {
    // Update client rect
    element && setRect(measureElement(element))
  }, [element])

  useResize(element, refreshDomRect)

  return [rect, refreshDomRect]
}
