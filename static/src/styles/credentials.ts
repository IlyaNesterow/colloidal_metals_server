import styled from 'styled-components'


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  div{
    width: 50%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 1s;
  }
  div:hover{
    background-color: #888;
  }
  @media only screen and (max-width: 1000px){
    h2{
      font-size: 1.3rem;
    }
  }
  @media only screen and (max-width: 700px){
    div{
      width: 100%;
    }
  }
`

export default Container