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

import type { ResponsiveValue } from '@looker/design-tokens'
import { system } from '@looker/design-tokens'

export type AsideSizes = 'rail' | 'navigation' | 'sidebar'

export type AsideSizeRamp = Record<AsideSizes, string>

export type AsideWidth = ResponsiveValue<AsideSizeRamp | string>

/* eslint-disable sort-keys-fix/sort-keys-fix */
export const asideSizes: AsideSizeRamp = {
  rail: '3.5rem',
  navigation: '16rem',
  sidebar: '20rem',
}

export const asideWidth = system({
  width: {
    property: 'width',
    scale: 'asideSizes',
    defaultScale: asideSizes,
  },
})
