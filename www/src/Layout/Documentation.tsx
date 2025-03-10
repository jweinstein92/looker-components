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

import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql } from 'gatsby'
import React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { Launch } from '@styled-icons/material'
import {
  useTabs,
  TabList,
  TabPanel,
  Tab,
  TabPanels,
  Heading,
  ButtonTransparent,
  Space,
  Span,
  Tooltip,
} from '@looker/components'
import { Status } from '../components'
import { Layout } from './Layout'
import { PropsExamples } from './PropsExamples'

const githubBase =
  'https://github.com/looker-open-source/components/blob/main/packages/'

interface DocQuery {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
    mdx: {
      body: string
      frontmatter: {
        title: string
        description?: string
        github?: string
        status?: 'experimental' | 'stable' | 'deprecated'
        storybook?: boolean
        storybookPath?: string
      }
    }
  }
}

const DocumentationLayout = (props: DocQuery) => {
  const { mdx, site } = props.data
  const {
    github,
    status = 'stable',
    storybook,
    storybookPath,
    title,
  } = mdx.frontmatter
  const githubPath = github || `components/src/${title}/${title}.tsx`

  const tab = useTabs()
  const body = <MDXRenderer>{mdx.body}</MDXRenderer>

  return (
    <>
      <Helmet title={`${title} - ${site.siteMetadata.title}`} />
      <Layout>
        <Space>
          <Heading as="h1" fontSize="xxxxxlarge">
            {title}
          </Heading>
          <Status status={status} />
        </Space>

        <CustomTabs>
          {storybook && (
            <TabList {...tab}>
              <Tab>Overview</Tab>
              <Tab>
                Storybook{' '}
                <Span
                  fontSize="xsmall"
                  color="text1"
                  fontWeight="normal"
                  lineHeight="normal"
                >
                  Props &amp; Examples
                </Span>
              </Tab>
            </TabList>
          )}
          <Tooltip content="GitHub">
            <ButtonTransparent
              ml="auto"
              iconAfter={<Launch />}
              onClick={() => window.open(`${githubBase}${githubPath}`)}
            >
              View source
            </ButtonTransparent>
          </Tooltip>
        </CustomTabs>
        {storybook ? (
          <TabPanels height="100%" {...tab} pt="none">
            <TabPanel>{body}</TabPanel>
            {storybook && (
              <TabPanel>
                <PropsExamples component={storybookPath || title} />
              </TabPanel>
            )}
          </TabPanels>
        ) : (
          body
        )}
      </Layout>
    </>
  )
}

const Iframe = styled.iframe`
  border: none;
  height: 120rem;
  width: 100%;
`

const CustomTabs = styled(Space)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.ui2};
  border-top: 1px solid ${({ theme }) => theme.colors.ui2};
  display: flex;
  margin: ${({ theme: { space } }) => `${space.u3} 0 ${space.u5}`};
  min-height: ${({ theme }) => theme.space.u5};

  ${TabList} {
    margin-bottom: -1px;
    margin-top: ${({ theme }) => theme.space.u2};
  }
`

export default DocumentationLayout

export const pageQuery = graphql`
  query Doc($id: String) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        github
        status
        storybook
        storybookPath
        title
      }
    }
  }
`
