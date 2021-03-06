import styled from 'styled-components'
import { PropsWithTheme } from '../types/styles'
 

const Container = styled.div<PropsWithTheme>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;

  #content{
    height: 70%;
    width: 40%;
    padding: 5%;
    position: relative;
  }
  #content h1{
    margin-bottom: .6rem;
    font-size: 2.5rem;
    font-family: 'Noto Sans TC', Arial, Helvetica, sans-serif;
    color: #${ props => props.darkTheme ? 'eee' : '222' };
  }
  h5{
    color: #ff5533;
    font-size: 1rem;
    font-weight: 500;
  }
  #content input{
    width: 100%;
  }
  #button{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.8rem;
    width: 100%;
    height: 2.8rem;
    border-radius: 1.8rem;
    font-size: 1.1rem;
    border: none;
    background-color: #3355ee;
    font-size: .9rem;
    font-family: 'Noto Sans TC', Arial, Helvetica, sans-serif;
    color: #eee;  
    transition: background-color .5s;
  }
  #button:hover{
    background-color: #3355aa;
  }
  #info{
    margin-left: .5rem;
    font-weight: 700;
  }

  .loader,
  .loader:before,
  .loader:after {
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation: load7 1.8s infinite ease-in-out;
    animation: load7 1.8s infinite ease-in-out;
  }
  .loader {
    color: #ffffff;
    position: relative; 
    margin-top: -5rem;
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
  .loader:before,
  .loader:after {
    content: '';
    position: absolute;
    top: 0;
  }
  .loader:before {
    left: -2rem;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }
  .loader:after {
    left: 2rem;
  }
  @-webkit-keyframes load7 {
    0%,
    80%,
    100% {
      box-shadow: 0 2.5rem 0 -1.3rem;
    }
    40% {
      box-shadow: 0 2.5rem 0 0;
    }
  }
  @keyframes load7 {
    0%,
    80%,
    100% {
      box-shadow: 0 2.5rem 0 -1.3rem;
    }
    40% {
      box-shadow: 0 2.5rem 0 0;
    }
  }
  @media only screen and (max-width: 500px){
    #content h1{
      margin-bottom: .2rem; 
      font-size: 1.7rem;
    }
    #button{
      margin-top: 1.5rem;
      width: 90%;
      height: 2.5rem;
      border-radius: 1.8rem;
      font-size: 1rem;
    }
  }
  @supports (-webkit-touch-callout: none){
    #content input{
      height: 3rem;
      padding: .7rem .8rem;
      font-size: 1rem;
      font-weight: 500;
    }
    #button{
      height: 3rem;
    }
  }
`

export default Container