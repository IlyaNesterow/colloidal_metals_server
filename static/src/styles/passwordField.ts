import styled from 'styled-components'
import { PropsWithTheme } from '../types/styles'

interface props extends PropsWithTheme{
  visible: boolean
}

const InputContainer = styled.div<props>`
  position: relative;
  height: 2.8rem;
  width: 100%;

  input{
    position: absolute;
    top: 0; left: 0;
  } 
  #eye{
    top: calc(50% - .95rem); right: 1rem;
    position: absolute;
  }
  #eye svg{
    height: 1.9rem; width: 1.9rem;
  }
  #eye g{
    fill: ${ props => props.darkTheme ? '#eee' : '#222' };
  } 
  #eye::after{
    content: "";
    position: absolute;
    bottom: 53%; right: 10%;
    width: 1.6rem;
    transform: rotateZ(-45deg);
    height: 2px;
    background-color: ${ props => props.darkTheme ? '#eee' : '#222' };
    border-radius: .1rem;
    transition: opacity .3s;
    opacity: ${ props => props.visible ? '1' : '0' };
  }
  @supports (-webkit-touch-callout: none){
    #eye{
      top: calc(50% - .8rem); right: 2.5rem;
    }
  }
`

export default InputContainer