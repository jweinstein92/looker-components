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
import type { FC, SyntheticEvent } from 'react'
import React, { useContext } from 'react'
import type { NavbarElementProps } from 'react-day-picker'
import styled from 'styled-components'
import noop from 'lodash/noop'
import { ChevronLeft } from '@styled-icons/material-rounded/ChevronLeft'
import { ChevronRight } from '@styled-icons/material-rounded/ChevronRight'
import { IconButton } from '@looker/components'
import type { CalendarSize } from './calendar-size'
import { CalendarContext } from './CalendarContext'

export const headingSizeMap = (size?: CalendarSize) => {
  switch (size) {
    case 'small':
      return 'h6'
    case 'medium':
      return 'h5'
    case 'large':
      return 'h4'
    default:
      return 'h5'
  }
}

export const CalendarNav: FC<Partial<NavbarElementProps>> = ({
  children,
  labels,
  nextMonth,
  previousMonth,
}) => {
  const {
    onNextClick = noop,
    onPrevClick = noop,
    showPreviousButton,
    showNextButton,
    size,
  } = useContext(CalendarContext)

  const handleNextClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onNextClick(nextMonth)
  }

  const handlePreviousClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onPrevClick(previousMonth)
  }

  return (
    <NavGrid>
      <NextButtonWrapper>
        {showPreviousButton && (
          <IconButton
            icon={<ChevronLeft />}
            label={labels?.previousMonth}
            size={size}
            onClick={handlePreviousClick}
          />
        )}
      </NextButtonWrapper>
      {children}
      <PrevButtonWrapper>
        {showNextButton && (
          <IconButton
            icon={<ChevronRight />}
            label={labels?.nextMonth}
            size={size}
            onClick={handleNextClick}
            style={{ justifySelf: 'right' }}
          />
        )}
      </PrevButtonWrapper>
    </NavGrid>
  )
}

const NavGrid = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  justify-items: center;
`

const NextButtonWrapper = styled.div`
  justify-self: left;
`

const PrevButtonWrapper = styled.div`
  justify-self: right;
`
