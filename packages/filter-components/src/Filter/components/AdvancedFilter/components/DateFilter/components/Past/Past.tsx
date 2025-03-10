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
import type { FilterModel } from '@looker/filter-expressions'
import type { ILookmlModelExploreField } from '@looker/sdk'
import type { ChangeEvent, FC } from 'react'
import React, { useMemo } from 'react'
import { useFiscalPastUnits, usePastUnits } from '../../../../../../constants'
import { showFiscalUnits } from '../../../../utils/show_fiscal_units'
import { GroupSelect } from '../../../GroupSelect'
import { GroupInput } from '../../../GroupInput'

interface PastProps {
  item: FilterModel
  onChange: (id: string, item: Partial<FilterModel>) => void
  field: ILookmlModelExploreField
}

export const Past: FC<PastProps> = ({ item, onChange, field }: PastProps) => {
  const { id, value, unit, complete } = item

  const valueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = String(e.target.value).split(',').map(Number)
    onChange(id, { value: newValue })
  }

  const unitChange = (value: string) => {
    const option = options.find(option => option.value === value)
    onChange(item.id, { unit: option?.unit, complete: option?.complete })
  }
  const selectedUnit = complete ? `c_${unit}` : `${unit}`

  const fiscalPastUnits = useFiscalPastUnits()
  const pastUnits = usePastUnits()
  const options = showFiscalUnits(field) ? fiscalPastUnits : pastUnits
  // options have extra properties that will cause React warnings
  const formattedOptions = useMemo(
    () => options.map(({ label, value }) => ({ label, value })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  return (
    <>
      <GroupInput onChange={valueChange} value={value} placement="middle" />
      <GroupSelect
        value={selectedUnit}
        options={formattedOptions}
        onChange={unitChange}
        placement="right"
      />
    </>
  )
}
