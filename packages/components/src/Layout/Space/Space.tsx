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

import styled, { css } from 'styled-components'
import type { FlexboxProps, SpacingSizes } from '@looker/design-tokens'
import { flexbox, shouldForwardProp, variant } from '@looker/design-tokens'
import type { CommonLayoutProps } from '../utils/common'
import { commonLayoutCSS } from '../utils/common'

export interface SpaceHelperProps extends CommonLayoutProps, FlexboxProps {
  /**
   * Amount of space between grid cells
   * @default medium
   */
  gap?: SpacingSizes

  /**
   * The spacing between each pair of adjacent items is the same. The empty space before the
   * first and after the last item equals half of the space between each pair of adjacent items.
   * (citation: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content)
   * @default false
   */
  around?: boolean

  /**
   * The spacing between each pair of adjacent items is the same. The first item is flush with
   * the main-start edge, and the last item is flush with the main-end edge.
   * (citation: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content)
   * @default false
   */
  between?: boolean

  /**
   * The spacing between each pair of adjacent items, the main-start edge and the first item,
   * and the main-end edge and the last item, are all exactly the same.
   * (citation: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content)
   * @default false
   */
  evenly?: boolean

  /**
   * reverse direction of content
   * @default false
   */
  reverse?: boolean
  /**
   * Align items vertically within `Space`
   * NOTE: This will by overridden if `stretch=true`
   * @default center
   */
  align?: 'start' | 'center' | 'end'

  /**
   * Justify items horizontally within `Space`
   * NOTE: This will by overridden by any of stretch, evenly, reverse or between
   * NOTE: Justification is based on flex-direction so if `reverse=true` this will be "backwards"
   * @default start
   */
  justify?: 'start' | 'center' | 'end'

  /**
   * Stretch items full width of space
   * @default false
   */
  stretch?: boolean
}

export const defaultGap = 'u4'

export const spaceCSS = css`
  ${commonLayoutCSS}
  ${flexbox}

  display: flex;
`

/**
 * Sadly, there's no way to detect if a browser supports flexbox-gap ("gap" is supported via grid)
 * Chrome 84 will purportedly support flexbox "gap" if it does so we'll look for a fix that allows
 * for specific targeting of that browser as well
 *
 * The `gap` implementation properly adds space between items both horizontally and vertically
 * when `flexGap="gap"` whereas the home-grown version only produces gaps on the horizontal axis.
 *
 */

const fauxGap = ({ gap = defaultGap, reverse }: SpaceHelperProps) => css`
  && > * {
    margin-right: ${({ theme: { space } }) => space[gap]};
  }

  ${({ theme: { space } }) =>
    reverse
      ? `&& > *:first-child { margin-right: ${space.none}; }`
      : `&& > *:last-child { margin-right: ${space.none}; }`}
`

const flexGap = ({ gap = defaultGap, reverse }: SpaceHelperProps) => css`
  @supports (-moz-appearance: none) {
    gap: 0 ${({ theme: { space } }) => space[gap]};
  }

  @supports not (-moz-appearance: none) {
    ${fauxGap({ gap, reverse })}
  }

  /* Target IE11 */
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    ${fauxGap({ gap, reverse })}
  }
`

const verticalAlign = variant({
  prop: 'align',
  variants: {
    center: {
      alignItems: 'center',
    },
    end: {
      alignItems: 'flex-end',
    },
    start: {
      alignItems: 'flex-start',
    },
  },
})

const justify = variant({
  prop: 'justify',
  variants: {
    center: {
      justifyContent: 'center',
    },
    end: {
      justifyContent: 'flex-end',
    },
    start: {
      justifyContent: 'flex-start',
    },
  },
})

export const Space = styled.div
  .withConfig({ shouldForwardProp })
  .attrs<SpaceHelperProps>(({ alignItems = 'center', width = '100%' }) => ({
    alignItems,
    width,
  }))<SpaceHelperProps>`
  ${spaceCSS}
  ${({ stretch }) => !stretch && verticalAlign}
  ${({ stretch }) => !stretch && justify}
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};

  ${({ around }) => around && 'justify-content: space-around;'}
  ${({ between }) => between && 'justify-content: space-between;'}
  ${({ evenly }) => evenly && 'justify-content: space-evenly;'}
  ${({ around, between, evenly }) => !around && !between && !evenly && flexGap}
`
