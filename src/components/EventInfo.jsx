import React from 'react'
import styled from 'react-emotion'
import { css } from 'emotion'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'
import { hideS } from '../elements/Hide'
import Tags from './Tags'
import { FaCalendar } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'
const djMixer = require('../icons/dj-mixer.svg')

const Wrapper = styled.article`
  position: relative;
  z-index: 100;
  border-radius: ${props => props.theme.borderRadius.default};
  box-shadow: ${props => props.theme.shadow.feature.small.default};
  transition: ${props => props.theme.transitions.boom.transition};
  height: 20rem;
  margin: 0 auto;
  margin-bottom: 2rem;
  padding: 1.25rem;
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
    height: 22rem;
  }
`

const Information = styled.div`
  h2 {
    font-size: 2rem;
    margin-bottom: 1.25rem;
    display: inline-block;
    color: ${props => props.theme.colors.black.base};
    transition: all ${props => props.theme.transitions.default.duration};
    &:hover {
      color: ${props => props.theme.colors.primary.base};
    }
  }
`

const marginBottom = css`
  margin-bottom: 0.5rem;
`

const Statistics = styled.div`
  color: ${props => props.theme.colors.black.lighter};
  h3,
  h4 {
    color: ${props => props.theme.colors.black.base};
  }
  span {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  img {
    width: 40px;
    height: 35px;
    margin-right: 0.5rem;
  }
`

const Excerpt = styled.div`
  margin-top: 1rem;
`

const EventInfo = ({
  lineup,
  path,
  title,
  date,
  location,
  inputTags,
  excerpt,
}) => {
  let tags = false
  if (inputTags[0].tag) {
    tags = inputTags.map(tag => tag.tag.document[0].data.tag)
  }
  return (
    <Wrapper>
      <Information>
        <Link to={path}>
          <h2>{title}</h2>
        </Link>
        <Statistics className={marginBottom}>
          <img src={djMixer} />
          <u>LINE UP:</u>
          <h3 style={{ display: 'inline' }}>{` ${lineup}`}</h3>
        </Statistics>
        <Statistics>
          <FaCalendar size={20} />
          <span>{date}</span>
          <MdLocationOn size={20} />
          <h4 style={{ display: 'inline' }}>{` ${location}`}</h4>
        </Statistics>
        {tags && <Tags tags={tags} />}
        <Excerpt>{`${excerpt}...`}</Excerpt>
      </Information>
    </Wrapper>
  )
}

export default EventInfo

EventInfo.propTypes = {
  lineup: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  inputTags: PropTypes.array.isRequired,
  excerpt: PropTypes.string.isRequired,
}
