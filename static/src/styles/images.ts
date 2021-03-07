import styled from 'styled-components'


const Container = styled.div`
  margin: 15vh 3rem;
  margin-bottom: 10vh;

  h1{
    text-align: center;
    margin-bottom: 3rem;
  }
  #images{
    display: flex;
    flex-wrap: wrap;
  }
  #img-in-modal{
    max-width: 90%;
    max-height: 90%
  }
  #upload-img-btn{
    width: 20%;
    margin: 2rem 40%;
    padding: .7rem;
    font-weight: 700;
    font-size: .9rem;
    border: none;
    color: #fff;
    background-color: #3355ff;
    border-radius: 2rem;
  }
  @media only screen and (max-width: 750px){
    margin: 15vh 1rem;

    h1{
      margin-bottom: 1rem;
      text-align: left;
      margin-left: 1rem;
      font-size: 1.5rem;
    }
    #upload-img-btn{
      width: 80%;
      margin: 1rem 10%;
      padding: .7rem;
    }
  }
`

export default Container