// import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { ButtonPrimary } from '@primer/components'

const Button = styled(ButtonPrimary)`
  background: #586069;
  // border: none;
  // border-radius: ${props => props.theme.borderRadius.round};
  // // box-shadow: ${props => props.theme.button[props.type].boxShadow};
  // color: ${props => props.theme.colors.white.base};
  // cursor: pointer;
  font-family: ${props => props.theme.fontFamily.heading};
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.25;
  margin: 2rem auto;
  min-width: 10rem;
  padding: 1.15rem 2.45rem;
  text-align: center;
  transition: ${props => props.theme.transitions.default.transition};
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  z-index: 10;
  -webkit-appearance: button;
  &:hover {
    background: #6a737d;
  }
`

export default Button

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary']),
}

Button.defaultProps = {
  type: 'default',
}
