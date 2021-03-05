import styled from 'styled-components'
import { PropsWithTheme } from '../types/styles'

interface Props extends PropsWithTheme{
  mounted: boolean
}

const Container = styled.div<Props>`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 6;
  backdrop-filter:  ${ props => props.mounted ? 'blur(20px)' : '' };;

  #inner-container{
    width: 40%;
    height: 50%;
    background-color: rgba(255, 50, 50, .2);
    transition: opacity .5s;
    opacity: ${ props => props.mounted ? '1' : '0' };
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
  }
  #close-error-log{
    position: absolute;
    top: .7rem; right: 0;
    padding: 1rem;
  }
  #close-error-log-cross{
    width: 25px; height: 1px;
    background-color: #${ props => props.darkTheme ? 'eee' : '333' };
    transform: rotateZ(45deg);
  }
  #close-error-log-cross::after{
    content: "";
    position: absolute;
    width: 25px; height: 1px;
    background-color: #${ props => props.darkTheme ? 'eee' : '333' };
    transform: rotateZ(-90deg);
  }
  h5{
    font-family: 'Noto Sans TC', Arial, Helvetica, sans-serif;
    font-size: 1rem;
    color: #888;
  }
  @media only screen and (max-width: 1000px){
    #inner-container{
      width: 80%;
      height: 60%;
    }
  }
`

export default Container