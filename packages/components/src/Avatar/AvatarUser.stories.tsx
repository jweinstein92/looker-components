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
import type { Story } from '@storybook/react/types-6-0'
import { defaultArgTypes as argTypes } from '../../../../apps/storybook/src/defaultArgTypes'
import type { AvatarUserProps } from './AvatarUser'
import { AvatarUser } from './AvatarUser'

const Template: Story<AvatarUserProps> = args => <AvatarUser {...args} />

/* eslint-disable camelcase */
const user = {
  avatar_url:
    'https://github.com/looker-open-source/components/blob/1b708b472d974987e80c30bbbb286911a438542a/packages/components/test-assets/cheese.png?raw=true',
  first_name: 'Cheddar',
  last_name: 'Cheese',
}

export const Primary = Template.bind({})
Primary.args = {
  user,
}
Primary.parameters = {
  storyshots: { disable: true },
}

export const Initials = Template.bind({})
Initials.args = {
  user: { ...user, avatar_url: null },
}

export const ImageError = Template.bind({})
ImageError.args = {
  user: { ...user, avatar_url: 'broken-image' },
}

export default {
  argTypes,
  component: AvatarUser,
  title: 'AvatarUser',
}
