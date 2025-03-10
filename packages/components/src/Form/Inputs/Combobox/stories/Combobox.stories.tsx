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
import React, { useEffect, useState } from 'react'
import type { OptionIndicatorProps } from '..'
import {
  Combobox,
  ComboboxMulti,
  ComboboxMultiInput,
  ComboboxMultiList,
  ComboboxMultiOption,
  ComboboxOption,
  ComboboxList,
  ComboboxInput,
} from '..'
import { Button, Heading, Paragraph, Space, SpaceVertical } from '../../../..'

import { defaultArgTypes as argTypes } from '../../../../../../../apps/storybook/src/defaultArgTypes'
export { ListLayoutDemo } from './ListLayout'

const CustomIndicator: FC<OptionIndicatorProps> = ({
  isActive,
  isSelected,
}) => {
  let indicator

  if (isSelected) {
    indicator = '>>'
  } else if (isActive) {
    indicator = '>'
  } else {
    indicator = ''
  }
  return <>{indicator}</>
}

export const ComboboxDemo = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = window.setTimeout(() => {
      setLoading(false)
    }, 4000)
    return () => {
      window.clearTimeout(t)
    }
  }, [])

  const [option, setOption] = useState({ value: 'Bananas' })
  const handleChange = (newOption: any) => {
    setOption(newOption)
  }
  const [options, setOptions] = useState([{ value: 'Bananas' }])
  const handleMultiChange = (newOptions: any) => {
    setOptions(newOptions)
  }

  return (
    <Space p="u5" align="start">
      <SpaceVertical>
        <Heading>Controlled</Heading>
        <Combobox width={300} value={option} onChange={handleChange}>
          <ComboboxInput />
          <ComboboxList>
            {loading ? (
              <ComboboxOption value="Loading..." />
            ) : (
              <>
                <ComboboxOption value="Apples" />
                <ComboboxOption value="Oranges" />
                <ComboboxOption value="Grapes" />
                <ComboboxOption value="Bananas" />
                <ComboboxOption value="Pineapples" />
                <ComboboxOption value="Apples2" />
                <ComboboxOption value="Oranges2" />
                <ComboboxOption value="Grapes2" />
                <ComboboxOption value="Bananas2" />
                <ComboboxOption value="Pineapples2" />
                <ComboboxOption value="Apples3" />
                <ComboboxOption value="Oranges3" />
                <ComboboxOption value="Grapes3" />
                <ComboboxOption value="Bananas3" />
                <ComboboxOption value="Pineapples3" />
                <ComboboxOption value="Apples4" />
                <ComboboxOption value="Oranges4" />
                <ComboboxOption value="Grapes4" />
                <ComboboxOption value="Bananas4" />
                <ComboboxOption value="Pineapples4" />
              </>
            )}
          </ComboboxList>
        </Combobox>
        <ComboboxMulti
          width={300}
          values={options}
          onChange={handleMultiChange}
        >
          <ComboboxMultiInput onClear={() => alert('CLEAR')} freeInput />
          <ComboboxMultiList>
            <ComboboxMultiOption value="Apples" />
            <ComboboxMultiOption value="Oranges" />
            <ComboboxMultiOption value="Grapes" />
            <ComboboxMultiOption value="Bananas" />
            <ComboboxMultiOption value="Pineapples" />
          </ComboboxMultiList>
        </ComboboxMulti>
        <Heading>Uncontrolled</Heading>
        <Combobox width={300}>
          <ComboboxInput />
          <ComboboxList>
            <ComboboxOption value="Apples super long text to see what wrapping looks like" />
            <ComboboxOption value="Oranges" />
            <ComboboxOption value="Grapes" />
            <ComboboxOption value="Bananas" />
            <ComboboxOption value="Pineapples" />
            <ComboboxOption
              value=""
              label="Create New Option"
              highlightText={false}
            />
          </ComboboxList>
        </Combobox>
        <ComboboxMulti width={300}>
          <ComboboxMultiInput onClear={() => alert('CLEAR')} freeInput />
          <ComboboxMultiList>
            <ComboboxMultiOption value="Apples" />
            <ComboboxMultiOption value="Oranges" />
            <ComboboxMultiOption value="Grapes" />
            <ComboboxMultiOption value="Bananas" />
            <ComboboxMultiOption value="Pineapples" />
          </ComboboxMultiList>
        </ComboboxMulti>
      </SpaceVertical>
      <SpaceVertical>
        <Heading>Indicator</Heading>
        <Combobox width={300}>
          <ComboboxInput placeholder="indicator={false}" />
          <ComboboxList indicator={false} persistSelection>
            <ComboboxOption value="Apples" />
            <ComboboxOption value="Oranges" />
            <ComboboxOption value="Grapes" />
            <ComboboxOption value="Bananas" />
            <ComboboxOption value="Pineapples" />
            <ComboboxOption
              value=""
              label="Create New Option"
              highlightText={false}
            />
          </ComboboxList>
        </Combobox>
        <ComboboxMulti width={300}>
          <ComboboxMultiInput
            onClear={() => alert('CLEAR')}
            placeholder="Custom indicator"
          />
          <ComboboxMultiList indicator={CustomIndicator} persistSelection>
            <ComboboxMultiOption value="Apples" />
            <ComboboxMultiOption value="Oranges" />
            <ComboboxMultiOption value="Grapes" />
            <ComboboxMultiOption value="Bananas" />
            <ComboboxMultiOption value="Pineapples" />
          </ComboboxMultiList>
        </ComboboxMulti>
      </SpaceVertical>
    </Space>
  )
}

ComboboxDemo.parameters = {
  storyshots: { disable: true },
}

export const ControlledInputValue = () => {
  const [inputValue, setInputValue] = useState('starting value')
  const [values, setValues] = useState([{ value: 'Apples' }])
  const handleClick = () => setInputValue('bananas')
  return (
    <SpaceVertical width={300} align="start">
      <Paragraph>Current inputValue: {inputValue}</Paragraph>
      <Button onClick={handleClick}>Change Input Value</Button>
      <ComboboxMulti values={values} onChange={setValues}>
        <ComboboxMultiInput
          autoComplete={false}
          inputValue={inputValue}
          onInputChange={setInputValue}
          freeInput
        />
        <ComboboxMultiList persistSelection>
          <ComboboxMultiOption value="Apples" />
          <ComboboxMultiOption value="Oranges" />
          <ComboboxMultiOption value="Grapes" />
          <ComboboxMultiOption value="Bananas" />
          <ComboboxMultiOption value="Pineapples" />
        </ComboboxMultiList>
      </ComboboxMulti>
    </SpaceVertical>
  )
}

ControlledInputValue.parameters = {
  storyshots: { disable: true },
}

export default {
  argTypes,
  component: Combobox,
  title: 'Combobox',
}
