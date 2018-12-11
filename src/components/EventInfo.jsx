import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { css } from 'react-emotion'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
// import Tags from './Tags'
import { GoCalendar, GoLocation, GoSettings } from 'react-icons/go'
import { CardWrapper } from './LayoutComponents/Index'

// const dj = require('../icons/dj.svg')

const Information = styled.div`
  h3 {
    display: inline-block;
    // color: ${props => props.theme.colors.black.base};
    color: black;
    transition: all ${props => props.theme.transitions.default.duration};
    // &:hover {
    //   color: ${props => props.theme.colors.primary.base};
    // }
  }
`

const marginVertical = css`
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`

const Statistics = styled.div`
  color: ${props => props.theme.colors.black.lighter};
  h3,
  h4 {
    color: ${props => props.theme.colors.black.base};
  }
  span,
  h4 {
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
      <Statistics>
        <GoCalendar size={20} />
        <span>{date}</span>
        <GoLocation size={20} />
        {` ${location}`}
      </Statistics>
      <Information>
        <Link to={`program/${path}`}>
          <h3 className={marginVertical}>{title}</h3>
        </Link>
        <Statistics className={marginVertical}>
          {/* <img alt="" src={dj} /> */}
          <GoSettings size={20} />
          <h4 style={{ display: 'inline' }}>{` ${lineup}`}</h4>
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
