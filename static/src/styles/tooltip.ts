import styled from 'styled-components'

interface Props {
  visible: boolean
  position: 'top' | 'bottom'
  borderColor?: string
}

const Tooltip = styled.p<Props>`
  position: absolute;
  ${ props => props.position }: -2rem;
  left: -3vw;
  width: calc(6vw + 2rem);
  text-align: center;
  font-size: .8rem;
  padding: .4rem;
  border: solid 1px ${ props => props.borderColor || '#3377ff' };
  border-radius: .5rem;
  transition: opacity .8s;
  opacity: ${ props => props.visible ? 1 : 0 };
  white-space: nowrap;

  @media only screen and (max-width: 850px){   
    display: none;
  }
`

export default Tooltip