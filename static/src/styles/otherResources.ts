import styled from 'styled-components'
import { PropsWithCurrentBool } from '../types/styles'


const Container = styled.div<PropsWithCurrentBool>`
  padding: 10%;

  h2{
    padding-bottom: .5rem;
    border-bottom: solid 1px #88888888;
    color: #${ props => props.darkTheme ? 'fff' : '111' };
  }
  a{
    transition: opacity 3s;
    opacity: ${ props => props.current ? 1 : 0 };
  }
  #links{
    margin-top: 2rem;
  }
  @media only screen and (max-width: 600px){
    padding: 5%;
  }
`

export default Container