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

import type { FC } from 'react'
import React from 'react'
import type { ButtonProps } from '@looker/components'
import { ButtonTransparent } from '@looker/components'
import type { ThemeEditableProps } from './types'

export const thunderSalmon: ThemeEditableProps = {
  colors: {
    background: 'lightsalmon',
    critical: '#f23900',
    inform: '#ff6991',
    key: 'salmon',
    link: '#420f00',
    positive: '#ffc8b7',
    text: 'white',
    warn: '#ffd769',
  },
  fontFamilies: { body: 'Papyrus', brand: 'Impact', code: 'Papyrus' },
}

export const ThunderSalmon: FC<ButtonProps> = props => (
  <ButtonTransparent {...props}>⚡️ 🍣</ButtonTransparent>
)
