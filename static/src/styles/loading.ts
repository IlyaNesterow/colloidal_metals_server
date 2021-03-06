import styled from 'styled-components'

interface Props {
  loading: boolean
}

const Container = styled.div<Props>`
  position: fixed;
  top: 0;
  left: ${ props => props.loading ? 0 : -100 }vw;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  backdrop-filter: blur(20px);
  display: flex;
  justify-content: center;
  align-items: center;

  .lds-hourglass {
    display: inline-block;
    position: relative;
    width: 30vh;
    height: 30vh;
  }
  .lds-hourglass:after {
    content: " ";
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    box-sizing: border-box;
    border: 12vh solid #3355ff;
    border-color: #3355ff transparent #3355ff transparent;
    animation: lds-hourglass 2s infinite;
  }
  @keyframes lds-hourglass {
    0% {
      transform: rotate(0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
      transform: rotate(900deg);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
      transform: rotate(1800deg);
    }
  }
`

export default Container