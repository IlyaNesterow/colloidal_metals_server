import styled from 'styled-components'
import { PropsWithTheme } from '../types/styles'


const Form = styled.form<PropsWithTheme>`
  width: 30%;
  p{
    margin-top: 1.5rem;
    margin-bottom: .5rem;
    margin-left: .9rem;
    color: #${ props => props.darkTheme ? 'bbb' : '555' };
    font-weight: 500;
    letter-spacing: .03rem;
  }
  input{
    height: 2.8rem; width: 100%;
    border: none;
    background-color: #${ props => props.darkTheme ? '252525' : 'f5f5f5' };
    padding: .5rem 1.3rem;
    border-radius: 1.8rem;
    font-size: 1.1rem;
    transition: box-shadow .3s;
    color: #${ props => props.darkTheme ? 'ddd' : '333' };
  }
  button{
    margin-top: 1.8rem;
    width: 100%;
    height: 2.8rem;
  }
`

export default Form