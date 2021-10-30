import { LayoutProps, SpaceProps, TypographyProps } from 'styled-system'

export interface CardProps extends Omit<SpaceProps, 'size'>, TypographyProps, LayoutProps {
    background?: string
    width?: string
    height?: string
    marginLeft?: string
    marginRight?: string
    marginX: string
    marginY?: string
    marginTop?: string
    marginBottom?: string
    border?: string
    padding?: string
}