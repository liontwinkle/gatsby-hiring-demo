import React from 'react'
import styled from 'styled-components'
import theme from '../../config/theme'
import { CircleOcticon } from '@primer/components'
import { Play } from '@githubprimer/octicons-react'

const LogoContainer = styled.div`
  position: fixed;
  bottom: 1em;
  right: 1em;
  z-index: 100;
  cursor: pointer;
  border-radius: 50%;
  ${props =>
    props.playing &&
    `box-shadow: 0 0 0 ${theme.colors.white.blue};
  animation: pulse 2s infinite;
  @-webkit-keyframes pulse {
    0% {
      -webkit-box-shadow: 0 0 0 0 ${theme.colors.white.blue};
    }
    70% {
      -webkit-box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
    }
    100% {
      -webkit-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
    }
  }
  @keyframes pulse {
    0% {
      -moz-box-shadow: 0 0 0 0 ${theme.colors.white.blue};
      box-shadow: 0 0 0 0 ${theme.colors.white.blue};
    }
    70% {
      -moz-box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
      box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
    }
    100% {
      -moz-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
      box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
    }
  }`}
`

const SpinningPlayer = ({ playing }) => {
  return (
    <LogoContainer playing={playing}>
      <CircleOcticon
        icon={Play}
        size={50}
        bg={theme.colors.white.blue}
        color={theme.colors.background.dark}
      />
    </LogoContainer>
  )
}

export default SpinningPlayer
