import styled from 'styled-components'
import { PropsWithTheme } from '../types/styles'

interface MenuContentPops extends PropsWithTheme{
  rollDown: boolean
} 

const Container = styled.div<MenuContentPops>`
  position: relative;
  margin-top: 2rem;
  height: calc(100vh - 3.5rem);
  width: 100%;
  padding: 1rem;
  overflow: hidden;

  #inner-container{
    position: absolute;
    margin: 0 .5rem;
    height: calc(100% - 1rem); width: calc(100% - 1rem);
    left: 0; top: ${ props => props.rollDown ? '0' : '-100rem' };
    transition: top .5s ease-out;
    overflow-y: auto;
  }
  .menu-link{
    display: block;
    padding: 1.19rem .8rem;
    margin: 0 .9rem;
    color: ${ props => props.darkTheme ? '#eee' : '#111' };
    font-weight: 500;
    font-size: .85rem;
    letter-spacing: .03rem;
    font-family: 'Open Sans', Arial, Helvetica, sans-serif;
    border-bottom: solid 1px ${ props => props.darkTheme ? 'rgba(222,222,222,0.25)' : 'rgba(0,0,0,0.25)' };
  }
  #auth-ctx{
    display: none;
  }
  @media only screen and (max-width: 1000px){
    #auth-ctx{
      display: block;
    }
  }
`

export default Container