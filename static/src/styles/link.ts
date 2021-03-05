import styled from 'styled-components'
import { PropsWithTheme } from '../types/styles'

interface Props extends PropsWithTheme{
  num: number
  sameAlign: boolean
}

const Link = styled.a<Props>`
  transition: opacity ${ props => props.num * 0.4 };
  text-align: ${ props => (props.sameAlign ? 'left' : props.num % 2 === 0 ? 'left' : 'right') };
  display: block;
  margin: 1rem 0;
`

export default Link