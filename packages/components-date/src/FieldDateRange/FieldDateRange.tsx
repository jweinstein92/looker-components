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

import type { FocusEvent, Ref } from 'react'
import React, { forwardRef } from 'react'
import styled from 'styled-components'
import type { FieldProps, FloatingLabelFieldProps } from '@looker/components'
import {
  FloatingLabelField,
  omitFieldProps,
  pickFieldProps,
  useFormContext,
  useID,
} from '@looker/components'
import type { InputDateRangeProps } from '../InputDateRange'
import { InputDateRange } from '../InputDateRange'

export interface FieldInputDateRangeProps
  extends FieldProps,
    FloatingLabelFieldProps,
    InputDateRangeProps {
  ref: Ref<HTMLInputElement>
}

const checkValueOnBlur = (e: FocusEvent) => {
  const inputs = Array.from(e.currentTarget.querySelectorAll('input'))
  // Check both inputs (to - from) for a value
  return inputs.some(input => input.value !== '')
}

const FieldDateRangeComponent = forwardRef(
  (props: FieldInputDateRangeProps, ref: Ref<HTMLInputElement>) => {
    const validationMessage = useFormContext(props)
    const id = useID(props.id)

    return (
      <FloatingLabelField
        {...pickFieldProps(props)}
        checkValueOnBlur={checkValueOnBlur}
        hasValue={!!props.defaultValue || !!props.value}
        id={id}
        validationMessage={validationMessage}
      >
        <InputDateRange
          {...omitFieldProps(props)}
          aria-describedby={`describedby-${id}`}
          aria-labelledby={`labelledby-${id}`}
          id={id}
          validationType={validationMessage && validationMessage.type}
          ref={ref}
        />
      </FloatingLabelField>
    )
  }
)

FieldDateRangeComponent.displayName = 'FieldDateRangeComponent'

export const FieldDateRange = styled(FieldDateRangeComponent)``
