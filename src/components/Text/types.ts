import { LayoutProps, SpaceProps, TypographyProps } from 'styled-system'

export interface TextProps extends Omit<SpaceProps, 'size'>, TypographyProps, LayoutProps {
  color?: string
  fontSize?: string
  bold?: boolean
  small?: boolean
  transition?: string
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize'
  textDecoration?: string
}

export enum TextSize {
  HEADER_1 = 'header-1',
  HEADER_2 = 'header-2',
  HEADER_3 = 'header-3',
  HEADER_4 = 'header-4',
  TITLE_1 = 'title-1',
  CONTENT_1 = 'content-1',
  HIGHLIGHT = 'highlight',
  TITLE_2 = 'title-2',
  BODY_1 = 'body-1',
  CONTENT_2 = 'content-2',
  TITLE_3 = 'title-3',
  BODY_2 = 'body-2',
  DESCRIPTION = 'description',
  BADGE = 'badge',
  NOTE = 'note',
}

export enum FontWeight {
  REGULAR = 400,
  SEMI_BOLD = 600,
  BOLD = 700,
  EXTRA_BOLD = 800,
}
