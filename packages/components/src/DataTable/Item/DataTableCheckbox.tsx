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
import type { MixedBoolean } from '../../Form'
import { Checkbox } from '../../Form'
import { ItemTarget } from './ItemTarget'

export interface DataTableCheckboxProps {
  id?: string
  checked?: MixedBoolean
  disabled?: boolean
  onChange?: () => void
}

export const checkListProps = ['checked', 'disabled', 'onChange', 'id']

export const DataTableCheckbox: FC<DataTableCheckboxProps> = ({
  id,
  onChange,
  checked,
  disabled,
}) => {
  const handleCellOnClick = () => !disabled && onChange && onChange()
  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) =>
    event.key === 'Enter' && event.currentTarget.click()

  let ariaLabel: string | undefined = 'Select all rows'
  if (id !== 'headerId') {
    ariaLabel = undefined
  } else if (checked) {
    ariaLabel = 'Select none'
  }

  return (
    <ItemTarget aria-labelledby={`rowheader-${id}`} onClick={handleCellOnClick}>
      <Checkbox
        aria-label={ariaLabel}
        checked={checked}
        disabled={disabled}
        onKeyDown={handleOnKeyDown}
        tabIndex={-1}
      />
    </ItemTarget>
  )
}
