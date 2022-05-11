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
import { screen, fireEvent } from '@testing-library/react'
import { renderWithTheme } from '@looker/components-test-utils'
import { mockPieConfig, mockLineConfig } from '@looker/visualizations-adapters'
import { Legend } from './Legend'

afterEach(() => {
  jest.resetAllMocks()
})

describe('Legend', () => {
  const handleConfigChange = jest.fn()

  it('hidden when legend is unsupported', () => {
    const { container } = renderWithTheme(
      <Legend
        config={{ type: 'unsupported' as 'line' }}
        onConfigChange={handleConfigChange}
      />
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('hide legend (position="none")', () => {
    renderWithTheme(
      <Legend config={mockPieConfig} onConfigChange={handleConfigChange} />
    )

    // open select menu
    fireEvent.click(screen.getByLabelText('Legend'))
    // choose new option
    fireEvent.click(screen.getByText('none'))

    expect(handleConfigChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        type: 'pie',
        legend: false,
      })
    )
  })

  it('change position', () => {
    renderWithTheme(
      <Legend config={mockLineConfig} onConfigChange={handleConfigChange} />
    )
    // open select menu
    fireEvent.click(screen.getByLabelText('Legend'))
    // choose new option
    fireEvent.click(screen.getByText('top'))

    expect(handleConfigChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        type: 'line',
        legend: { position: 'top' },
      })
    )

    // Close popover to silence act() warning
    fireEvent.click(document)
  })

  it('edits legend type for Pie charts', () => {
    renderWithTheme(
      <Legend config={mockPieConfig} onConfigChange={handleConfigChange} />
    )
    // open select menu
    fireEvent.click(screen.getByLabelText('Legend Type'))
    // choose new option
    fireEvent.click(screen.getByText('labels'))

    expect(handleConfigChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        type: 'pie',
        legend: { position: 'bottom', type: 'labels', value: 'label' },
      })
    )

    // Close popover to silence act() warning
    fireEvent.click(document)
  })

  it('edits legend values for Pie charts', () => {
    renderWithTheme(
      <Legend config={mockPieConfig} onConfigChange={handleConfigChange} />
    )
    // open select menu
    fireEvent.click(screen.getByLabelText('Legend Values'))
    // choose new option
    fireEvent.click(screen.getByText('label_percent'))

    expect(handleConfigChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        type: 'pie',
        legend: { position: 'bottom', type: 'legend', value: 'label_percent' },
      })
    )

    // Close popover to silence act() warning
    fireEvent.click(document)
  })

  it('does not edit legend type or values for Line charts', () => {
    renderWithTheme(
      <Legend config={mockLineConfig} onConfigChange={handleConfigChange} />
    )

    expect(screen.queryByLabelText('Legend Type')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Legend Values')).not.toBeInTheDocument()
  })
})
