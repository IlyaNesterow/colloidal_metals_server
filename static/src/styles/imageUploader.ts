import styled from 'styled-components'

const Container = styled.div`
  width: 50%;
  height: 90%;
  overflow: scroll;

  label{
    padding: .7rem;
    margin-bottom: .5rem;
    width: 30%;
    text-align: center;
  }
  #file-picker{
    display: none;
  }
  #input-field{
    width: 100%;
    padding: .5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #image-preview{
    max-width: 100%;
    max-height: 50%;
  }
  #remove-file{
    font-size: 2rem;
    margin-top: 1rem;
  }
  button{
    padding: 1rem;
    width: 50%;
    margin: 1.5rem 25%;
  }
  @media only screen and (max-width: 1000px){
    width: 90%;
    label, button{
      padding: .6rem;
    }
    button{
      width: 70%;
      margin: 1.5rem 15%;
    }
  }
`

export default Container