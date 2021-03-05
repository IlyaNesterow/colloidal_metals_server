import styled from 'styled-components'
import { InfoLogProps } from '../types/styles'


const Paragraph = styled.p<InfoLogProps>`
  position: absolute;
  left: 9%; top: calc(3.4rem + 20%);
  width: 70%;
  padding: 1rem;
  background-color: #${ props => props.darkTheme ? '111' : 'fff' };
  box-shadow: ${ props => props.darkTheme ? '0 4px 16px rgb(255 255 255 / 10%)' : '0 4px 16px rgb(0 0 0 / 10%)' };
  line-height: 1.4rem;
  border-radius: .5rem; 
  font-weight: 400;
  transition: opacity .05s;
  z-index: ${ props => props.visible ? '2' : '-1' };
  opacity: ${ props => props.opacite ? '1' : '0' };
  @media only screen and (max-width: 1000px){
    top: 7.5rem;
    left: 0;
    width: 90%;
  }
  @media only screen and (max-width: 500px){
    top: 5.5rem;
    left: 0;
    width: 90%;
  }
`

export default Paragraph