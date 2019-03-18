import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0% {
    transform: scale(1);
    animation-timing-function: ease-in;
  }
  25% {
    animation-timing-function: ease-out;
    transform: scale(1.05);
  }
  50% {
    transform: scale(1.12);
    animation-timing-function: ease-in;
  }
  to {
    transform: scale(1);
    animation-timing-function: ease-out;
  }
`
export const CardWrapper = styled.article`
  position: relative;
  z-index: 100;
  // border-radius: ${props => props.theme.borderRadius.default};
  // box-shadow: ${props => props.theme.shadow.feature.small.default};
  // transition: ${props => props.theme.transitions.boom.transition};
  // background-color: ${props => props.theme.colors.white.base};
  height: 20rem;
  margin: 0 auto;
  margin-bottom: 2rem;
  padding: 1.25rem;
  flex-basis: 851px;
  max-width: 851px;
  width: 851px;
  height: 630px;
  .flyer {
    height: 300px;
    margin-bottom: 1rem;
  }
  @media (max-width: 1000px) {
    flex-basis: 100%;
    max-width: 100%;
    width: 851px;
    height: 33rem;
    &:first-child {
      margin-bottom: 2rem;
    }
    .flyer {
      height: 300px;
      margin-bottom: 1rem;
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    flex-basis: 100%;
    max-width: 100%;
    height: 36rem;
    &:first-child {
      margin-bottom: 2rem;
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    flex-basis: 100%;
    max-width: 100%;
    height: 40rem;
    &:first-child {
      margin-bottom: 2rem;
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    flex-basis: 100%;
    max-width: 100%;
    height: 40rem;
    &:first-child {
      margin-bottom: 2rem;
    }
  }
`

export const MainWrapper = styled.div`
  height: 600px;
  background: ${props => props.theme.gradient.leftToRight};
  position: relative;
  overflow: hidden;
  .gatsby-image-wrapper {
    height: 600px;
    width: 100%;
    img {
      animation: ${pulse} 30s infinite;
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    height: 500px;
    .gatsby-image-wrapper {
      height: 500px;
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    height: 400px;
    .gatsby-image-wrapper {
      height: 400px;
    }
  }
`

export const Hero = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  color: ${props => props.theme.colors.white.light};
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${props => props.theme.layout.base};
  padding: 0 2rem;
  text-align: center;
`

export const Information = styled.div`
  margin-top: 2rem;
  font-family: ${props => props.theme.fontFamily.heading};
  a.fblink {
    white-space: nowrap;
    color: ${props => props.theme.colors.white.base};
    transition: all 0.4s;
    border-bottom: 1px solid transparent;
    &:hover {
      border-bottom: 1px solid white;
      color: white;
    }
    &:focus {
      color: white;
    }
  }
  .subElement {
    svg {
      margin-right: 0.5rem;
    }
  }
  .element {
    margin-right: 0.75rem;
    margin-left: 0rem;
    display: inline-block;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  div.location {
    white-space: nowrap;
    @media (min-width: 500px) {
      display: inline;
    }
  }
  h3,
  h4 {
    display: inline;
  }
  .margin {
    margin-left: 0.75rem;
    margin-right: 0.75rem;
  }
`

export const Statistics = styled.div`
  color: ${props => props.theme.colors.black.lighter};
  // h3,
  // h4 {
  //   color: ${props => props.theme.colors.black.base};
  // }
  span,
  h4 {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  .element {
    margin-right: 0.75rem;
    margin-left: 0rem;
    display:inline-block;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  img {
    width: 40px;
    height: 35px;
    margin-right: 0.5rem;
  }
`
