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

import type { SizeLarge, SizeMedium, SizeSmall } from '@looker/design-tokens'
import { variant } from '@looker/design-tokens'

export type CalendarSize = SizeSmall | SizeMedium | SizeLarge

/* eslint-disable sort-keys-fix/sort-keys-fix */
export const daySizeMap = {
  small: 32,
  medium: 36,
  large: 44,
}

/* eslint-disable sort-keys-fix/sort-keys-fix */
export const calendarSize = variant({
  prop: 'size',
  variants: {
    small: {
      fontSize: 'xsmall',
      height: `${daySizeMap.small}px`,
      width: `${daySizeMap.small}px`,
    },
    medium: {
      fontSize: 'small',
      height: `${daySizeMap.medium}px`,
      width: `${daySizeMap.medium}px`,
    },
    large: {
      fontSize: 'medium',
      height: `${daySizeMap.large}px`,
      width: `${daySizeMap.large}px`,
    },
  },
})

export const calendarSpacing = variant({
  prop: 'size',
  variants: {
    small: {
      p: 'small',
    },
    medium: {
      p: 'medium',
    },
    large: {
      p: 'large',
    },
  },
})
