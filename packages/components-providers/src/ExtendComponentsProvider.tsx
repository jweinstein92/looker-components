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

import type { ThemeCustomizations } from '@looker/design-tokens'
import { generateTheme } from '@looker/design-tokens'
import { ThemeContext, ThemeProvider } from 'styled-components'
import type { FC } from 'react'
import React, { useMemo, useContext } from 'react'

export interface ExtendComponentsTheme {
  themeCustomizations?: ThemeCustomizations
}

/**
 * This component is designed for making adjustments to the Theme without
 * initializing an entire ComponentsProvider. ExtendComponentsThemeProvider
 * will merge the themeCustomizations with the theme already established.
 *
 * This component is intended for use cases where a portion of page carries
 * a different theme than the rest.
 */
export const ExtendComponentsThemeProvider: FC<ExtendComponentsTheme> = ({
  children,
  themeCustomizations,
}) => {
  const parentTheme = useContext(ThemeContext)

  const theme = useMemo(() => {
    return generateTheme(parentTheme, themeCustomizations)
  }, [parentTheme, themeCustomizations])

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
