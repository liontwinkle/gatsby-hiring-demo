import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { css } from 'react-emotion'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
// import Tags from './Tags'
import { GoCalendar, GoPerson } from 'react-icons/go'
import { GiMusicalNotes } from 'react-icons/gi'
import { IoIosImages } from 'react-icons/io'
import { CardWrapper, Statistics } from './LayoutComponents'

// const dj = require('../icons/dj.svg')

const Information = styled.div`
  h3 {
    display: inline-block;
    // color: ${props => props.theme.colors.black.base};
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

const Excerpt = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const BlogInfo = ({
  path,
  title,
  date,
  author,
  excerpt,
  image,
  hasGallery,
  hasPlaylist,
}) => {
  return (
    <CardWrapper>
      <Link to={`blog/${path}`}>
        <Img alt="" className="flyer" fluid={image.childImageSharp.fluid} />
      </Link>
      <Statistics>
        <span className="element">
          <GoCalendar size={20} />
          <span className="subElement">{date}</span>
        </span>
        <span className="element">
          <GoPerson size={20} />
          <span className="subElement">{author}</span>
        </span>
        {hasPlaylist && (
          <span className="element">
            <GiMusicalNotes size={20} />
          </span>
        )}
        {hasGallery && (
          <span className="element">
            <IoIosImages size={20} />
          </span>
        )}
      </Statistics>
      <Information>
        <Link to={`blog/${path}`}>
          <h3 className={marginVertical}>{title}</h3>
        </Link>
        {/* <Statistics className={marginVertical}>
          <GoSettings size={20} />
          <h4 style={{ display: 'inline' }}>{` ${lineup}`}</h4>
        </Statistics> */}
        <Excerpt>{`${excerpt}...`}</Excerpt>
      </Information>
    </CardWrapper>
  )
}

export default BlogInfo

BlogInfo.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  author: PropTypes.string.isRequired,
  hasGallery: PropTypes.bool.isRequired,
  hasPlaylist: PropTypes.bool.isRequired,
}
