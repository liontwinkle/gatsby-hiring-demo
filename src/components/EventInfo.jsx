import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { css } from 'react-emotion'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
// import Tags from './Tags'
import { GoCalendar, GoLocation } from 'react-icons/go'
import { CardWrapper } from './LayoutComponents/Index'

const dj = require('../icons/dj.svg')

const Information = styled.div`
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    display: inline-block;
    color: ${props => props.theme.colors.black.base};
    transition: all ${props => props.theme.transitions.default.duration};
    &:hover {
      color: ${props => props.theme.colors.primary.base};
    }
  }
`

const marginVertical = css`
  margin-bottom: 1rem;
  margin-top: 1rem;
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
  margin-bottom: 1rem;
`

const EventInfo = ({
  lineup,
  path,
  title,
  date,
  location,
  inputTags,
  excerpt,
  image,
}) => {
  // let tags = false
  // if (inputTags[0].tag) {
  //   tags = inputTags.map(tag => tag.tag.document[0].data.tag)
  // }
  return (
    <CardWrapper>
      <Link to={`program/${path}`}>
        <Img alt="" className="flyer" fluid={image.childImageSharp.fluid} />
      </Link>
      <Information>
        <Link to={`program/${path}`}>
          <h2>{title}</h2>
        </Link>
        <Statistics>
          <GoCalendar size={20} />
          <span>{date}</span>
          <GoLocation size={20} />
          {` ${location}`}
        </Statistics>
        <Statistics className={marginVertical}>
          <img alt="" src={dj} />
          <h3 style={{ display: 'inline' }}>{` ${lineup}`}</h3>
        </Statistics>
        {/* {tags && <Tags tags={tags} />} */}
        <Excerpt>{`${excerpt}...`}</Excerpt>
      </Information>
    </CardWrapper>
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
  image: PropTypes.object.isRequired,
}
