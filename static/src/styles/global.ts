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
  h2{
    color: #${ props => props.darkTheme ? 'eee' : '111' };
  }
  form p{
    margin-top: 1.5rem;
    margin-bottom: .5rem;
    margin-left: .9rem;
    color: #${ props => props.darkTheme ? 'bbb' : '555' };
    font-weight: 500;
    letter-spacing: .03rem;
  }
  form input{
    height: 2.8rem;
    border: none;
    background-color: #${ props => props.darkTheme ? '252525' : 'f5f5f5' };
    padding: .5rem 1.3rem;
    border-radius: 1.8rem;
    font-size: 1.1rem;
    transition: box-shadow .3s;
    color: #${ props => props.darkTheme ? 'ddd' : '333' };
  }
  input:focus{
    outline: none;
    box-shadow: 0 0 .1rem #888;
  }
  @media only screen and (max-width: 1000px){
    form, #content{
      min-width: 60%;
    }
  }
  @media only screen and (max-width: 500px){
    form, #content{
      min-width: 80%;
    }
    form input{
      height: 2.3rem;
      padding: .5rem 1.3rem;
      font-size: 1rem;
    }
    form p{
      margin-top: 1.1rem;
      margin-bottom: .3rem;
      margin-left: .7rem;
    }
  }
`

export default global