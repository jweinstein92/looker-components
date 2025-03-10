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

import { ExtendComponentsThemeProvider } from '@looker/components-providers'
import type { Story } from '@storybook/react/types-6-0'
import { Favorite } from '@styled-icons/material'
import chunk from 'lodash/chunk'
import type { FC, FormEvent, MouseEvent } from 'react'
import React, { useMemo, useState, useEffect } from 'react'
import { Card, CardContent } from '../../../Card'
import { Button } from '../../../Button'
import { Dialog, DialogContent, DialogLayout } from '../../../Dialog'
import { Divider } from '../../../Divider'
import { Icon } from '../../../Icon'
import { Flex, Space, SpaceVertical } from '../../../Layout'
import { PopoverContent, usePopover } from '../../../Popover'
import { Heading, Paragraph, Text } from '../../../Text'
import { Form } from '../../'
import { Label } from '../../Label'
import type { ComboboxOptionObject } from '../../Inputs/Combobox'
import type {
  SelectOptionProps,
  SelectOptionGroupProps,
} from '../../Inputs/Select'
import { useToggle } from '../../../utils'
import { FieldToggleSwitch } from '../FieldToggleSwitch'
import {
  cheeseOptions,
  iconOptions,
  options,
  optionsWithGroups,
} from '../../Inputs/Select/stories/options'
import { options1k } from '../../Inputs/Select/stories/options1k'
import { defaultArgTypes as argTypes } from '../../../../../../apps/storybook/src/defaultArgTypes'
import type { FieldSelectProps } from './FieldSelect'
import { FieldSelect } from './FieldSelect'

const Template: Story<FieldSelectProps & { externalLabel: boolean }> = ({
  externalLabel = true,
  ...args
}) => (
  <ExtendComponentsThemeProvider
    themeCustomizations={{ defaults: { externalLabel } }}
  >
    <FieldSelect {...args} />
  </ExtendComponentsThemeProvider>
)

export const Basic = Template.bind({})
Basic.args = {
  label: 'Label',
  options: cheeseOptions,
  placeholder: 'Placeholder',
}

export const Value = Template.bind({})
Value.args = {
  ...Basic.args,
  value: 'gouda',
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...Basic.args,
  disabled: true,
}

export const DisabledValue = Template.bind({})
DisabledValue.args = {
  ...Disabled.args,
  value: 'gouda',
}

export const Detail = Template.bind({})
Detail.args = {
  ...Basic.args,
  detail: '0/50',
}

export const Description = Template.bind({})
Description.args = {
  ...Basic.args,
  description: "I'm a little teapot",
}

export const DescriptionDetailFloatingLabel = Template.bind({})
DescriptionDetailFloatingLabel.args = {
  ...Basic.args,
  description: "I'm a little teapot",
  detail: '0/50',
  externalLabel: false,
}

export const Required = Template.bind({})
Required.args = {
  ...Basic.args,
  required: true,
}

export const Error = Template.bind({})
Error.args = {
  ...Basic.args,
  validationMessage: { message: 'Error Message', type: 'error' },
}

export const ErrorValue = Template.bind({})
ErrorValue.args = {
  ...Error.args,
  value: 'gouda',
}

export const ErrorValueFloatingLabel = Template.bind({})
ErrorValueFloatingLabel.args = {
  ...Error.args,
  externalLabel: false,
  value: 'gouda',
}

export const Inline = Template.bind({})
Inline.args = {
  ...Basic.args,
  inline: true,
}

export const ErrorInline = Template.bind({})
ErrorInline.args = {
  ...Error.args,
  inline: true,
}

export const AutoResize = Template.bind({})
AutoResize.args = {
  ...Detail.args,
  autoResize: true,
}

export const AutoResizeFloatingLabel = Template.bind({})
AutoResizeFloatingLabel.args = {
  ...Detail.args,
  autoResize: true,
  externalLabel: false,
}

const optionsWithDescriptions = options.map((option: ComboboxOptionObject) => ({
  ...option,
  description: `${option.label} are the best ever!`,
}))

const checkOption = (option: ComboboxOptionObject, searchTerm: string) => {
  return (
    option.label &&
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )
}

const optionReducer = (searchTerm: string) => {
  return (acc: SelectOptionProps[], option: SelectOptionProps) => {
    const optionAsGroup = option as SelectOptionGroupProps
    if (optionAsGroup.options) {
      const filteredGroupOptions = optionAsGroup.options.filter(option =>
        checkOption(option, searchTerm)
      )
      if (filteredGroupOptions.length > 0) {
        return [...acc, { ...optionAsGroup, options: filteredGroupOptions }]
      }
      return acc
    }
    if (checkOption(option as ComboboxOptionObject, searchTerm)) {
      return [...acc, option]
    }
    return acc
  }
}

const TestIndicator = () => {
  return <Text color="pink">***</Text>
}

export const SelectContent = () => {
  const [value, setValue] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const fruit = e.currentTarget.getAttribute('data-fruit') || ''
    setValue(fruit)
  }
  const handleChange = (value: string) => {
    setValue(value)
  }
  const handleFilter = (term: string) => {
    setSearchTerm(term)
  }
  const newOptions = useMemo(() => {
    if (searchTerm === '') return options1k
    return options1k.reduce(optionReducer(searchTerm), [])
  }, [searchTerm])

  // For testing a bug where the options are overly-sensitive to "changes"
  // This component re-renders on mousedown due to an upstream usePopover*
  // thus these options will be newly instantiated on mousedown
  // but the options should NOT un/re-mount – if they do, the click to
  // select an option will not register. Instead it will close the Popover,
  // b/c the clicked option has been unmounted and Popover's check for the
  // target being "above" it will fail and its "close on click outside" behavior
  // will be triggered

  // * State changes in usePopover, like the one triggered by mousedown,
  // belong to SelectDemo, this component's parent, and parent state changes
  // cause child re-renders. If Popover were used instead, it would be a sibling
  // to this component thus "protecting" it from the state change.
  const unMemoizedOptions = [{ value: 'Cheddar' }, { value: 'Gouda' }]

  return (
    <SpaceVertical align="start" maxWidth={600}>
      <Heading>Select</Heading>
      <FieldSelect
        label="1k (windowed) options"
        width={300}
        options={options1k}
        aria-label="Fruits"
        placeholder="Select Brand"
        defaultValue="Boulder Creek"
        autoFocus
      />
      <Label>
        Use alignSelf="flex-start" to avoid filling height as a flex child
      </Label>
      <Flex>
        <Flex
          height={200}
          width={200}
          bg="ui3"
          alignItems="center"
          justifyContent="center"
          mr="small"
        >
          200 x 200
        </Flex>
        <FieldSelect
          width={300}
          options={newOptions}
          aria-label="Fruits"
          placeholder="Controlled, searchable, clearable"
          isClearable
          value={value}
          onChange={handleChange}
          onFilter={handleFilter}
          isFilterable
          alignSelf="flex-start"
        />
      </Flex>
      <Button mt="medium" mr="small" data-fruit="5" onClick={handleClick}>
        Kiwis
      </Button>
      <Button mt="medium" data-fruit="3" onClick={handleClick}>
        Oranges
      </Button>
      <Divider my="xlarge" />
      <FieldSelect
        label="Default Value"
        options={options}
        aria-label="Fruits"
        defaultValue="1"
      />
      <FieldSelect
        label="Groups"
        options={optionsWithGroups}
        aria-label="Fruits"
        defaultValue="1"
      />
      <FieldSelect
        label="Descriptions"
        options={optionsWithDescriptions}
        aria-label="Fruits"
        defaultValue="1"
      />
      <FieldSelect
        label="Error"
        options={options}
        aria-label="Fruits"
        placeholder="Select One"
        defaultValue="1"
        validationMessage={{ message: 'An error message', type: 'error' }}
      />
      <FieldSelect
        label="Disabled"
        options={options}
        aria-label="Fruits"
        placeholder="Select One"
        disabled
        defaultValue="1"
      />
      <FieldSelect
        label="Indicator"
        options={[
          ...options,
          {
            indicator: TestIndicator,
            label: 'I have my own indicator',
            value: 'indicator',
          },
        ]}
        aria-label="Fruits"
        defaultValue="1"
        indicator={<Icon icon={<Favorite />} />}
      />
      <FieldSelect
        label="Test option re-render bug"
        options={unMemoizedOptions}
      />
    </SpaceVertical>
  )
}

SelectContent.parameters = {
  storyshots: { disable: true },
}

// Can't have usePopover at the top level of a story because it ends up at the same level
// as ComponentsProvider and can't access FocusTrapContext or ScrollLockContext
const SelectDemoInner = () => {
  const [isOpen, setOpen] = useState(false)
  const handleClick = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { popover, domProps } = usePopover({
    content: (
      <PopoverContent>
        <SelectContent />
      </PopoverContent>
    ),
  })
  return (
    <SpaceVertical align="start">
      {popover}
      <Dialog isOpen={isOpen} onClose={handleClose}>
        <DialogContent>
          <SelectContent />
        </DialogContent>
      </Dialog>
      <Space>
        <Button {...domProps}>Open Popover</Button>
        <Button onClick={handleClick}>Open Dialog</Button>
      </Space>
      <Card maxWidth="500px" maxHeight="300px">
        <CardContent>
          <Form
            validationMessages={{
              fruitGroups: { message: 'This is an error', type: 'error' },
            }}
          >
            <Heading>Error State</Heading>
            <FieldSelect
              label="Fruit Groups"
              name="fruitGroups"
              width={300}
              options={optionsWithGroups}
              aria-label="Fruits"
              defaultValue="1"
            />
            <FieldSelect
              label="Another Grouped Dropdown"
              name="anotherGroup"
              width={300}
              options={optionsWithGroups}
              aria-label="Fruits"
              defaultValue="1"
              isClearable
              autoFocus
            />
          </Form>
        </CardContent>
      </Card>
    </SpaceVertical>
  )
}

export const SelectDemo = () => <SelectDemoInner />

SelectDemo.parameters = {
  storyshots: { disable: true },
}

export const UpdateOptions = () => {
  const [value, setValue] = useState('second')
  const { value: isPlural, toggle } = useToggle()
  const s = isPlural ? 's' : ''
  const options = useMemo(
    () => [
      { label: `Second${s}`, value: 'second' },
      { label: `Hour${s}`, value: 'hour' },
    ],
    [s]
  )
  return (
    <Space>
      <Button onClick={toggle}>Use {isPlural ? 'singular' : 'plural'}</Button>
      <FieldSelect
        autoResize
        options={options}
        value={value}
        onChange={setValue}
      />
    </Space>
  )
}

UpdateOptions.parameters = {
  storyshots: { disable: true },
}

export const EmptyValue = () => {
  const [value, setValue] = useState(false)
  const handleToggle = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.checked)
  }

  const [selectValue, setSelectValue] = useState('Option A')

  const options = [{ value: 'Option A' }, { value: 'Option B' }]

  return (
    <Space p="u5">
      <FieldToggleSwitch
        label="Use empty value"
        on={value}
        onChange={handleToggle}
      />
      <FieldSelect
        value={value ? '' : selectValue}
        placeholder="Can't change me when toggle is on"
        onChange={setSelectValue}
        options={options}
      />
      <FieldSelect
        value={value ? '' : selectValue}
        onChange={setSelectValue}
        options={[
          { label: 'Option with empty string value', value: '' },
          ...options,
        ]}
      />
    </Space>
  )
}

EmptyValue.parameters = {
  storyshots: { disable: true },
}

export const OptionIcons = () => {
  const [filterTerm, setFilterTerm] = useState('')
  const newOptions = useMemo(() => {
    return iconOptions.filter(
      iconOption =>
        iconOption.label.toLowerCase().indexOf(filterTerm.toLowerCase()) > -1
    )
  }, [filterTerm])
  return (
    <Space>
      <FieldSelect
        label="With Filtering"
        options={newOptions}
        placeholder="Search visualizations"
        isFilterable
        onFilter={setFilterTerm}
        isClearable
      />
      <FieldSelect
        label="No Filtering"
        options={iconOptions}
        placeholder="Select a visualization"
      />
      <FieldSelect
        label="Descriptions"
        options={iconOptions.map(option => ({
          ...option,
          description: 'This is a description',
        }))}
        placeholder="Select a visualization"
      />
      <FieldSelect
        label="Groups"
        options={chunk(iconOptions, 5).map((arr, index) => ({
          label: `Group ${index + 1}`,
          options: arr,
        }))}
        placeholder="Select a visualization"
      />
      <FieldSelect
        label="Custom Artwork"
        options={[
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1000 1187.198"
                width="1000"
                height="1187.198"
              >
                <path
                  d="m 979.04184,925.18785 c -17.95397,41.47737 -39.20563,79.65705 -63.82824,114.75895 -33.56298,47.8528 -61.04356,80.9761 -82.22194,99.3698 -32.83013,30.192 -68.00529,45.6544 -105.67203,46.5338 -27.04089,0 -59.6512,-7.6946 -97.61105,-23.3035 -38.08442,-15.5358 -73.08371,-23.2303 -105.08578,-23.2303 -33.56296,0 -69.55888,7.6945 -108.06101,23.2303 -38.5608,15.6089 -69.62484,23.7432 -93.37541,24.5493 -36.12049,1.5389 -72.1237,-14.3632 -108.06101,-47.7796 -22.93711,-20.0059 -51.62684,-54.3017 -85.99592,-102.8874 C 92.254176,984.54592 61.937588,924.38175 38.187028,855.7902 12.750995,781.70252 0,709.95986 0,640.50361 0,560.94181 17.191859,492.32094 51.626869,434.81688 78.689754,388.62753 114.69299,352.19192 159.75381,325.44413 c 45.06086,-26.74775 93.74914,-40.37812 146.18212,-41.25019 28.68971,0 66.3125,8.8744 113.06613,26.31542 46.62174,17.49964 76.55727,26.37404 89.68198,26.37404 9.8124,0 43.06758,-10.37669 99.4431,-31.06405 53.31237,-19.18512 98.30724,-27.12887 135.16787,-23.99975 99.8828,8.06098 174.92313,47.43518 224.82789,118.37174 -89.33023,54.12578 -133.51903,129.93556 -132.63966,227.18753 0.8061,75.75115 28.28668,138.78795 82.2952,188.8393 24.47603,23.23022 51.81008,41.18421 82.22186,53.93522 -6.59525,19.12648 -13.557,37.44688 -20.95846,55.03446 z M 749.96366,23.751237 c 0,59.37343 -21.69138,114.810233 -64.92748,166.121963 -52.17652,60.99961 -115.28658,96.24803 -183.72426,90.68597 -0.87204,-7.12298 -1.37769,-14.61967 -1.37769,-22.49743 0,-56.99843 24.81315,-117.99801 68.87738,-167.873453 21.99909,-25.25281 49.978,-46.25018 83.90738,-63.00018 C 686.57507,10.688027 718.59913,1.5631274 748.71783,5.2734376e-4 749.59727,7.9378274 749.96366,15.875627 749.96366,23.750467 Z"
                  id="path4"
                />
              </svg>
            ),
            label: 'iOS',
            value: 'iOS',
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="48px"
                height="48px"
              >
                <path
                  fill="#7cb342"
                  d="M12 29c0 1.1-.9 2-2 2s-2-.9-2-2v-9c0-1.1.9-2 2-2s2 .9 2 2V29zM40 29c0 1.1-.9 2-2 2s-2-.9-2-2v-9c0-1.1.9-2 2-2s2 .9 2 2V29zM22 40c0 1.1-.9 2-2 2s-2-.9-2-2v-9c0-1.1.9-2 2-2s2 .9 2 2V40zM30 40c0 1.1-.9 2-2 2s-2-.9-2-2v-9c0-1.1.9-2 2-2s2 .9 2 2V40z"
                />
                <path
                  fill="#7cb342"
                  d="M14 18v15c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V18H14zM24 8c-6 0-9.7 3.6-10 8h20C33.7 11.6 30 8 24 8zM20 13.6c-.6 0-1-.4-1-1 0-.6.4-1 1-1s1 .4 1 1C21 13.1 20.6 13.6 20 13.6zM28 13.6c-.6 0-1-.4-1-1 0-.6.4-1 1-1s1 .4 1 1C29 13.1 28.6 13.6 28 13.6z"
                />
                <path
                  fill="#7cb342"
                  d="M28.3 10.5c-.2 0-.4-.1-.6-.2-.5-.3-.6-.9-.3-1.4l1.7-2.5c.3-.5.9-.6 1.4-.3.5.3.6.9.3 1.4l-1.7 2.5C29 10.3 28.7 10.5 28.3 10.5zM19.3 10.1c-.3 0-.7-.2-.8-.5l-1.3-2.1c-.3-.5-.2-1.1.3-1.4.5-.3 1.1-.2 1.4.3l1.3 2.1c.3.5.2 1.1-.3 1.4C19.7 10 19.5 10.1 19.3 10.1z"
                />
              </svg>
            ),
            label: 'Android',
            value: 'Android',
          },
        ]}
        placeholder="Select a mobile platform"
      />
    </Space>
  )
}

OptionIcons.parameters = {
  storyshots: { disable: true },
}

export const CreateOption = () => {
  const [filterTerm, setFilterTerm] = useState('')
  const newOptions = useMemo(() => {
    return options.filter(
      option =>
        option.label.toLowerCase().indexOf(filterTerm.toLowerCase()) > -1
    )
  }, [filterTerm])
  const formatCreateLabel = (inputValue: string) => {
    return `Create a fruit: ${inputValue}`
  }
  return (
    <FieldSelect
      label="showCreate &amp; formatCreateLabel"
      options={newOptions}
      isFilterable
      onFilter={setFilterTerm}
      showCreate
      formatCreateLabel={formatCreateLabel}
      width={300}
    />
  )
}

CreateOption.parameters = {
  storyshots: { disable: true },
}

export const DelayUpdate = () => {
  const [value, setValue] = useState('1')
  const [tempValue, setTempValue] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => {
      setValue(tempValue)
    }, 0)
    return () => {
      clearTimeout(t)
    }
  }, [tempValue])
  return (
    <SpaceVertical align="start" width={450}>
      <FieldSelect
        label="Controlled with Delayed Update"
        description="Select should not lose focus when picking from the list"
        options={options}
        value={value}
        onChange={setTempValue}
      />
      <Button onClick={() => setTempValue('3')}>Oranges</Button>
      <Paragraph>
        Select should not gain focus after clicking this button
      </Paragraph>
    </SpaceVertical>
  )
}

DelayUpdate.parameters = {
  storyshots: { disable: true },
}

const LabelFocusColorTestLayout: FC<{ version: string }> = ({
  children,
  version,
}) => (
  <SpaceVertical>
    {children}
    <FieldSelect
      label={`Label ${version}`}
      defaultValue={options[0].value}
      options={options}
    />
    <Button>Button {version}</Button>
  </SpaceVertical>
)

export const LabelFocusColorTest = () => {
  return (
    <ExtendComponentsThemeProvider
      themeCustomizations={{ defaults: { externalLabel: false } }}
    >
      <LabelFocusColorTestLayout version="Initial">
        <Dialog
          content={
            <DialogLayout>
              <LabelFocusColorTestLayout version="Dialog" />
            </DialogLayout>
          }
        >
          <Button>Open Dialog</Button>
        </Dialog>
      </LabelFocusColorTestLayout>
    </ExtendComponentsThemeProvider>
  )
}

LabelFocusColorTest.parameters = {
  storyshots: { disable: true },
}

export default {
  argTypes,
  component: FieldSelect,
  title: 'FieldSelect',
}
