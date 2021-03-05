import styled from 'styled-components'
import { PropsWithTheme } from '../types/styles'

const Container = styled.div<PropsWithTheme>`
  position: fixed;
  height: 100vh;
  top: 0;
  left: .2rem;
  display: flex;
  align-items: center;

  #section-link{
    border-left-style: solid;
    border-left-width: 1px;
    margin: .5rem;
    padding: .1rem .4rem;
    cursor: pointer;
    transition: border-color .2s;
  }
  #section-link p{
    font-size: .8rem;
    font-weight: 500;
    transition: opacity .2s;
    color: #${ props => props.darkTheme ? '5599ff' : '3355ff' };
  }
  .invisible p{
    opacity: 0;
  }
  .current p{
    opacity: 1;
  }
  .invisible{
    border-left-color: #${ props => props.darkTheme ? 'fff' : '333' };
  }
  .current{
    border-left-color: #${ props => props.darkTheme ? '5599ff' : '3355ff' };
  }
  @media only screen and (max-width: 1000px){
    #section-link p{
      opacity: 0;
    }
  }
  @media only screen and (max-width: 600px){
    display: none;
  }
`

export default Container