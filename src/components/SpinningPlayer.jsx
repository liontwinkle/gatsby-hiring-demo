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
`

const SpinningPlayer = () => {
  return (
    <LogoContainer>
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
