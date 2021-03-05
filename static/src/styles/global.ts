import { createGlobalStyle } from 'styled-components'
import { PropsWithTheme } from '../types/styles'


const global = createGlobalStyle<PropsWithTheme>`
  ::-webkit-scrollbar { 
    display: none; 
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
    font-weight: 200;
    
  }
  .no-select{
    user-select: none; 
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
  body {
    transition: background-color .2s;
    overflow-x: hidden;
    background-color: ${ props => props.darkTheme ? '#111' : '#fefefe' };
    position: relative;
    min-height: 100vh;
  }
  a{
    text-decoration: none;
  }
`

export default global