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

import type { Language } from 'prism-react-renderer'
import Highlight, { defaultProps } from 'prism-react-renderer'
import styled from 'styled-components'
import type { FC } from 'react'
import React from 'react'
import { prismTheme } from './prismTheme'

interface CodeStaticProps {
  code: string
  language: Language
  className?: string
}

export const CodeStatic: FC<CodeStaticProps> = ({
  code,
  language,
  ...props
}) => {
  const outerClassName = props.className

  return (
    <Highlight
      {...defaultProps}
      code={code}
      language={language}
      theme={prismTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <PreWrapper className={`${className} ${outerClassName}`} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ key: i, line })} key={i}>
              {line.map((token, key) => (
                <span {...getTokenProps({ key, token })} key={key} />
              ))}
            </div>
          ))}
        </PreWrapper>
      )}
    </Highlight>
  )
}

const PreWrapper = styled.pre`
  border-radius: ${({ theme }) => theme.radii.medium};
  line-height: ${({ theme }) => theme.lineHeights.medium};
  margin: ${({ theme }) => theme.lineHeights.medium} 0;
  padding: ${({ theme }) => theme.space.u4};
`
