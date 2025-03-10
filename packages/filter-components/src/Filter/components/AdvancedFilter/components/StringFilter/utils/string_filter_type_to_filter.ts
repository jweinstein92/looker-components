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
import type { ElementType } from 'react'
import type {
  FilterTypeMap,
  StringFilterType,
} from '@looker/filter-expressions'
import defaultTo from 'lodash/defaultTo'
import { MatchesAdvanced } from '../../MatchesAdvanced'
import { UserAttributes } from '../../UserAttributes'

import { MultiStringInput } from '../components/MultiStringInput'
import { StringInput } from '../components/StringInput'

const Blank = () => ''

const filterTypeToStringMap: FilterTypeMap<StringFilterType> = {
  null: Blank,
  contains: MultiStringInput,
  match: MultiStringInput,
  startsWith: MultiStringInput,
  endsWith: MultiStringInput,
  blank: Blank,
  user_attribute: UserAttributes,
}

const filterTypeToStringMapSingleValue: FilterTypeMap<string> = {
  contains: StringInput,
  match: StringInput,
  startsWith: StringInput,
  endsWith: StringInput,
}

export const stringFilterTypeToFilter = (
  type: StringFilterType,
  isParameterField?: boolean,
  allowMultipleValues?: boolean
): ElementType => {
  if (
    (!allowMultipleValues || isParameterField) &&
    filterTypeToStringMapSingleValue[type]
  ) {
    return filterTypeToStringMapSingleValue[type]
  }
  return defaultTo(filterTypeToStringMap[type], MatchesAdvanced)
}
