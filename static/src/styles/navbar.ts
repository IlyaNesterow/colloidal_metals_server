import styled from 'styled-components'
import { MenuProps } from '../types/styles' 


const Navbar = styled.nav<MenuProps>`
  width: 100vw; height: 3.4rem;
  transition: background-color .2s;
  display: flex;
  justify-content: space-between;
  position: relative;
  position: fixed;
  top: 0; left: 0;
  z-index: 4;


  #Menu{
    width: 1.3rem;
    margin-top: 1.25rem;
    margin-right: .75rem;
    padding: 1rem;
    position: fixed;
    right: 0; 
    top: 0;
    z-index: 5; 
  } 
  #auth-ctx{
    right: 4rem;
    padding: 1rem;
    position: fixed;
    right: 3.05; top: 0;
    color: ${ props => props.darkTheme ? '#eee' : '#111' };
    font-weight: 600; 
    font-size: .85rem; 
    font-family: 'Open Sans', Arial, Helvetica, sans-serif;
    letter-spacing: .03rem;
    z-index: 2; 
  }
  #Menu div{
    width: 1.1rem;
    height: 2px;
    background-color: ${ props => props.darkTheme ? '#fff' : '#333' }; 
  }
  #top, #middle, #bottom{
    position: absolute;
    transition: all .3s; 
  }
  #top{
    left: 0; top: 0;
  }
  #middle{
    left: 0; top: .3rem;
  }
  #bottom{
    left: 0; top: .6rem;
  }
  .opened > #middle{
    opacity: 1; 
    width: 1.1rem;
    margin-left: 0;
  } 
  .closed > #middle{
    opacity: 0;
    width: 0;
    margin-left: 50%; 
  }
  .closed > #bottom,
  .closed > #top{
    top: .3rem;
    background-color: #888;  
  }
  .closed > #top{
    transform: rotate(45deg);
  }
  .closed > #bottom{
    transform: rotate(-45deg);
  }
  @media only screen and (max-width: 1000px){
    #auth-ctx{
      display: none;
    }
  }
`

export default Navbar