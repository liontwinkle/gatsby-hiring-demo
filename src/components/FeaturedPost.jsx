import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { css } from 'styled-components'
import styled from 'styled-components'
import theme from '../../config/theme'

const ImageOverlay = styled.div`
  border-radius: ${props => props.theme.borderRadius.default};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  opacity: 0.1;
  transition: opacity ${props => props.theme.transitions.default.duration};
  background-image: linear-gradient(
    30deg,
    ${props => props.theme.colors.secondary.light} 0%,
    ${props => props.theme.colors.secondary.dark} 100%
  );
`

const Wrapper = styled.article`
  position: relative;
  z-index: 100;
  border-radius: ${props => props.theme.borderRadius.default};
  box-shadow: ${props => props.theme.shadow.feature.small.default};
  transition: ${props => props.theme.transitions.boom.transition};
  height: 20rem;
  margin: 0 auto;
  margin-bottom: 2rem;
  &:hover {
    box-shadow: ${props => props.theme.shadow.feature.small.hover};
    transform: translateY(-12px);
    ${ImageOverlay} {
      opacity: 0.9;
    }
  }
  flex-basis: 851px;
  max-width: 851px;
  width: 851px;
  height: 315px;
  @media (max-width: 1000px) {
    flex-basis: 100%;
    max-width: 100%;
    width: 851px;
    height: 18rem;
    &:first-child {
      margin-bottom: 2rem;
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    height: 15rem;
  }
`

const styledLink = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  z-index: 3;
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0) 30%,
      rgba(0, 0, 0, 0) 70%,
      rgba(0, 0, 0, 0.6) 100%
    );
    z-index: -10;
    border-radius: ${theme.borderRadius.default};
    transition: opacity ${theme.transitions.default.duration};
  }
  &:hover {
    &:after {
      opacity: 0;
    }
  }
`

const Image = styled.div`
  position: absolute;
  top: 0;
  overflow: hidden;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.default};
  img {
    border-radius: ${props => props.theme.borderRadius.default};
  }
  > div {
    position: static !important;
  }
  > div > div {
    position: static !important;
  }
`

// const EventPic = styled.img`
//   height: 100%;
// `

const Information = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`

// const Category = styled.span`
//   color: ${props => props.theme.colors.black.base};
//   background-color: ${props => props.theme.colors.white.light};
//   box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
//   border-radius: ${props => props.theme.borderRadius.round};
//   padding: 0.25rem 1rem;
// `

const Date = styled.div`
  color: ${props => props.theme.colors.white.light};
`

const Description = styled.h2`
  color: ${props => props.theme.colors.white.light};
  text-align: left;
  margin-bottom: 0;
`

const FeaturedPost = ({ cover, path, from, to, naslov }) => (
  <Wrapper>
    <Image>
      <Img fluid={cover} />
    </Image>
    <Link to={`/nastani/${path}`} className={styledLink}>
      <Information>
        <Date>{from}</Date>
        <Date>{to}</Date>
      </Information>
      <Description>{naslov}</Description>
    </Link>
    <ImageOverlay />
  </Wrapper>
)

export default FeaturedPost

FeaturedPost.propTypes = {
  cover: PropTypes.any.isRequired,
  path: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  // description: PropTypes.string.isRequired,
  naslov: PropTypes.string.isRequired,
}

FeaturedPost.defaultProps = {
  sreda: '',
  cetvrtok: '',
  petok: '',
  sabota: '',
}
