import styled from 'styled-components'
import { MenuProps } from '../types/styles'


const Menu = styled.div<MenuProps>`
  #tab{
    height: 100vh;
    width: 312px;
    max-width: 85%;
    position: fixed;
    transition: right .5s;
    top: 0;
    right: ${ props => props.opened ? '0' : '-320px' };
    background-color: ${ props => props.darkTheme ? '#111' : '#fff' };
    z-index: 3;
  }
  
  #shadow{
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    backdrop-filter: blur(${ props => props.opened ? '25px' : '10px' });
    left: ${ props => props.opened ? '0' : '-100vw' };
    z-index: 2;
  }
`

export default Menu