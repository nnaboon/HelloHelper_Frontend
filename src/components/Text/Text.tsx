import styled from '@emotion/styled'
import { LayoutProps } from 'antd'
import { layout, space, typography } from 'styled-system'
import { isGradientColor, TEXT_COLOR } from '../../utils/theme'

import { FontWeight, TextProps, TextSize } from './types'

interface Props extends TextProps {
  size?: TextSize
  whiteSpace?: string
  textColorHover?: string
}

export const getFontSize = (size: TextSize) => {
  switch (size) {
    case TextSize.HEADER_1:
      return 32
    case TextSize.HEADER_2:
      return 24
    case TextSize.HEADER_3:
      return 20
    case TextSize.HEADER_4:
      return 18
    case TextSize.TITLE_1:
    case TextSize.CONTENT_1:
      return 16
    case TextSize.HIGHLIGHT:
    case TextSize.TITLE_2:
    case TextSize.BODY_1:
    case TextSize.CONTENT_2:
      return 14
    case TextSize.TITLE_3:
    case TextSize.BODY_2:
    case TextSize.DESCRIPTION:
      return 12
    case TextSize.BADGE:
    case TextSize.NOTE:
      return 10
    default:
      return 14
  }
}

export const getFontWeight = (size: TextSize) => {
  switch (size) {
    case TextSize.HIGHLIGHT:
      return FontWeight.EXTRA_BOLD
    case TextSize.HEADER_1:
    case TextSize.HEADER_2:
    case TextSize.HEADER_3:
    case TextSize.HEADER_4:
    case TextSize.TITLE_1:
    case TextSize.TITLE_2:
    case TextSize.TITLE_3:
    case TextSize.BADGE:
      return FontWeight.BOLD
    case TextSize.BODY_1:
    case TextSize.BODY_2:
      return FontWeight.SEMI_BOLD
    case TextSize.CONTENT_1:
    case TextSize.CONTENT_2:
    case TextSize.DESCRIPTION:
    case TextSize.NOTE:
      return FontWeight.REGULAR
    default:
      return FontWeight.SEMI_BOLD
  }
}

const Text = styled.div<Props>`
  width: ${({ width }) => width};
  color: ${({ theme, color }) => color};
  font-size: ${({ size }) => getFontSize(size)}px;
  font-weight: ${({ size }) => getFontWeight(size)};
  line-height: normal;
  white-space: ${({ whiteSpace }) => whiteSpace};
  ${({ textTransform }) => textTransform && `text-transform: ${textTransform};`}
  ${({ textDecoration }) => textDecoration && `text-decoration: ${textDecoration};`}
  transition: ${({ transition }) => transition ?? 'color 0.2s'};

  ${({ color }) =>
    isGradientColor(color) &&
    `
    background:${color};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    `}

  :hover {
    color: ${({ textColorHover }) => textColorHover};
  }

  ${space}
  ${typography}
  ${layout}
`

export default Text
