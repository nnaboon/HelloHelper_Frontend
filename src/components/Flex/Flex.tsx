import styled from '@emotion/styled'
import { layout, LayoutProps, space, SpaceProps } from 'styled-system'

type align =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'stretch'
  | 'baseline'
  | 'space-around'
  | 'space-evenly'
type direction = 'row' | 'column'

interface FlexProps extends SpaceProps, LayoutProps {
  justify?: align
  itemAlign?: align
  alignSelf?: align
  direction?: direction
  flexGrow?: string
  flexShrink?: string
  flexWrap?: string
}

const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${(props) => props.direction || 'row'};
  justify-content: ${(props) => props.justify || 'flex-start'};
  align-items: ${(props) => props.itemAlign || 'center'};
  align-self: ${(props) => props.alignSelf || ''};
  flex-grow: ${(props) => props.flexGrow || ''};
  flex-shrink: ${(props) => props.flexShrink || ''};
  flex-wrap: ${(props) => props.flexWrap || ''};
  width: 100%;
  ${layout}
  ${space}
`

export default Flex
