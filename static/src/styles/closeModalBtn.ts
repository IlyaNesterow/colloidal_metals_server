import styled from 'styled-components'


const Btn = styled.div`
  position: absolute;
  top: 1rem;
  right: .3rem;
  padding: .8rem;
  transition: transform .5s;

  div{
    width: 2rem;
    height: .2rem;
    background-color: #888;
    border-radius: .3rem;
  }
  #upper{
    margin-bottom: -.2rem;
    transform: rotate(45deg);
  }
  #lower{
    transform: rotate(-45deg);
  }
  :hover{
    transform: rotate(90deg);
  }
`

export default Btn