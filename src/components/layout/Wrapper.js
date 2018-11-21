import styled from 'styled-components'

const Wrapper = styled.article`
  position: relative;
  z-index: 100;
  border-radius: ${props => props.theme.borderRadius.default};
  box-shadow: ${props => props.theme.shadow.feature.small.default};
  transition: ${props => props.theme.transitions.boom.transition};
  background-color: ${props => props.theme.colors.white.base};
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
    height: 36rem;
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
    height: 39rem;
    &:first-child {
      margin-bottom: 2rem;
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    flex-basis: 100%;
    max-width: 100%;
    height: 43rem;
    &:first-child {
      margin-bottom: 2rem;
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    flex-basis: 100%;
    max-width: 100%;
    height: 50rem;
    &:first-child {
      margin-bottom: 2rem;
    }
  }
`
export default Wrapper
