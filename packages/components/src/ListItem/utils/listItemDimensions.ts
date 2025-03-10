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

import type { DensityRamp } from '@looker/design-tokens'
import type { ListItemDimensions } from '../types'

export const density0: ListItemDimensions = {
  descriptionFontSize: 'xsmall',
  descriptionLineHeight: 'xsmall',
  height: 36,
  iconGap: 'u3',
  iconSize: 'small',
  labelFontSize: 'small',
  labelLineHeight: 'small',
  px: 'u4',
  py: 'u2',
}

// Positive density values
export const densityPositive1: ListItemDimensions = {
  ...density0,
  descriptionFontSize: 'small',
  descriptionLineHeight: 'small',
  height: 48,
  iconGap: 'u4',
  iconSize: 'medium',
  labelFontSize: 'medium',
  labelLineHeight: 'medium',
  py: 'u3',
}

// Negative density values
export const densityNegative1: ListItemDimensions = {
  ...density0,
  height: 32,
  py: '0.375rem', // Note: We could get this value with "calc(${theme.xxsmall} + ${theme.xxxsmall})"
}
export const densityNegative2: ListItemDimensions = {
  ...densityNegative1,
  height: 28,
  py: 'u1',
}
export const densityNegative3: ListItemDimensions = {
  ...densityNegative2,
  height: 24,
  iconGap: 'u2',
  iconSize: 'xxsmall',
  labelFontSize: 'xsmall',
  labelLineHeight: 'xsmall',
}

// Lookup object
export const densities = {
  '-1': densityNegative1,
  '-2': densityNegative2,
  '-3': densityNegative3,
  '0': density0,
  '1': densityPositive1,
}

/**
 * Returns an object with size and spacing scaled to "density" parameter value
 * @param density Accepts values from -3 (smallest) to 1 (largest)
 */
export const listItemDimensions = (density: DensityRamp): ListItemDimensions =>
  densities[density]
