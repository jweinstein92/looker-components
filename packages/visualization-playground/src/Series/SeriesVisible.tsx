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
import type { FormEvent } from 'react'
import type {
  CArea,
  CBar,
  CColumn,
  CLine,
  CScatter,
  CTable,
  CSeriesBasic,
} from '@looker/visualizations-adapters'
import { FieldToggleSwitch } from '@looker/components'

/**
 * A list of relevant charts that access this configuration
 */
export type CVisibleSupported =
  | CArea
  | CBar
  | CColumn
  | CLine
  | CScatter
  | CTable

const renderFor: Array<CVisibleSupported['type']> = [
  'area',
  'bar',
  'column',
  'line',
  'scatter',
  'table',
]

export type SeriesVisibleProps = {
  chartType: CVisibleSupported['type']
  series: CSeriesBasic
  onSeriesChange: (series: CSeriesBasic) => void
}

export const SeriesVisible = (props: SeriesVisibleProps) => {
  const { chartType, series, onSeriesChange } = props

  if (!renderFor.includes(chartType)) {
    // Early return! Only render for supported charts
    return null
  }

  const handleChange = (e: FormEvent) => {
    const draft = { ...series, visible: (e.target as HTMLInputElement).checked }
    onSeriesChange(draft)
  }

  return (
    <FieldToggleSwitch
      label="Visible"
      onChange={handleChange}
      on={!!series.visible}
    />
  )
}
