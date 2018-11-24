import React from 'react'
import styled from 'styled-components'
import Logo from '../icons/Logo'

const StyledLogo = styled.div`
  svg {
    height: 4rem;
    margin-bottom: 0;
    width: 4rem;
  }
  svg {
    animation-name: ckw;
    animation-duration: 1.5s;
    /* Things added */
    animation-iteration-count: infinite;
    transform-origin: 50% 50%;
    display: inline-block;
    /* <--- */
  }
  @keyframes ckw {
    100% {
      transform: rotate(360deg);
    }
  }
`

const Loader = () => (
  <StyledLogo>
    <Logo />
  </StyledLogo>
)

export default Loader
