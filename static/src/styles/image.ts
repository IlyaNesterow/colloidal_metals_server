import styled from 'styled-components'
import { PropsWithTheme } from '../types/styles'


const Container = styled.div<PropsWithTheme>`
  max-width: calc(50% - 2rem); max-height: 50vh;
  margin: 1rem;
  overflow: hidden;
  position: relative;
  
  img{
    max-width: 100%;
    object-fit: cover;
  }
  #image-controls{
    position: absolute;
    top: 0; left: 0;
    height: 100%; width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    background-color: #${ props => props.darkTheme ? '222222dd' : 'ffffffdd' };
    transition: opacity .7s;
    opacity: 0;
  }
  #image-controls div{
    margin: 1rem 10%;
    position: relative;
    cursor: pointer; 
  }
  :hover #image-controls{
    opacity: 1;
  }
  @media only screen and (max-width: 850px){   
    max-width: 100%; max-height: 75vh;
    margin: .5rem;

    #image-controls{
      font-size: 1.5rem;
    }
    #image-controls div{
      margin: 1rem 15%;
    }
  }
`

export default Container