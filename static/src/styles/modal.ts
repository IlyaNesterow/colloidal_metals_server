import styled from 'styled-components'
import { PropsWithTheme } from '../types/styles'


const Container = styled.div<PropsWithTheme>`
  z-index: 5;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(25px);
  overflow: scroll;

  #centred{
    width: 100%; height: 100%;
    overflow: scroll;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export default Container
