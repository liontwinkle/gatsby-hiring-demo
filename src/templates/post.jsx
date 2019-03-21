import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { css, keyframes } from 'react-emotion'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
// import { Link } from 'gatsby'
// import kebabCase from 'lodash/kebabCase'
import { darken } from 'polished'
// import Tags from '../components/Tags'
import SEO from '../components/SEO'
import Container from '../components/Container'
import Content from '../components/Content'
import Wave from '../components/Wave'
// import Button from '../components/Button'
import Footer from '../components/Footer'
// import { hideS } from '../utils/hide'
import config from '../../config/website'
import Grid from 'react-css-grid'
import Player from '../components/Player'
import Lightbox from 'react-images'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PlayerConsumer from '../layouts/GlobalPlayerContext'
import { Twitter, Facebook } from 'react-social-sharing'
import { Flex, Box } from '@rebass/grid/emotion'
// import MainHeader from '../components/LayoutComponents/MainHeader'
import { Information } from '../components/LayoutComponents'
import { GoCalendar, GoPerson } from 'react-icons/go'
import { GiMusicalNotes } from 'react-icons/gi'
import { IoIosImages } from 'react-icons/io'

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

const Wrapper = styled.div`
  height: 600px;
  position: relative;
  overflow: hidden;
  .gatsby-image-wrapper {
    height: 600px;
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

const Hero = styled.div`
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

// const Information = styled.div`
//   margin-top: 2rem;
//   font-family: ${props => props.theme.fontFamily.heading};
//   a {
//     color: ${props => props.theme.colors.white.base};
//     transition: all 0.4s;
//     border-bottom: 1px solid transparent;
//     &:hover {
//       border-bottom: 1px solid white;
//       color: white;
//     }
//     &:focus {
//       color: white;
//     }
//   }
// `

const fontBold = css`
  font-weight: 700;
`

const Line = styled.div`
  width: 100%;
  height: 2px;
  background: ${props => darken(0.25, props.theme.tint.black)};
  margin-top: 1rem;
  margin-bottom: 1rem;
`

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
    }
    this.closeLightbox = this.closeLightbox.bind(this)
    this.openLightbox = this.openLightbox.bind(this)
    this.gotoPrevious = this.gotoPrevious.bind(this)
    this.gotoNext = this.gotoNext.bind(this)
    this.gotoImage = this.gotoImage.bind(this)
    this.handleClickImage = this.handleClickImage.bind(this)
  }

  openLightbox(index, event) {
    event.preventDefault()
    console.log('Index: ', index)
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    })
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    })
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    })
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    })
  }
  gotoImage(index) {
    this.setState({
      currentImage: index,
    })
  }
  handleClickImage() {
    if (
      this.state.currentImage ===
      this.props.data.prismicBlog.data.gallery.length - 1
    )
      return

    this.gotoNext()
  }
  render() {
    const post = this.props.data.prismicBlog
    console.log('POST', post)
    const { gallery } = post.data
    const playlist = post.data.body ? post.data.body[0] : null
    const PlaylistPlayer = playlist ? (
      <PlayerConsumer>
        {({ data, set }) => (
          <Player
            playlist={playlist.items}
            name={playlist.primary.playlist_name.text}
            contextData={data}
            setFunction={set}
            location={this.props.location}
          />
        )}
      </PlayerConsumer>
    ) : null
    const images = gallery[0].image1.localFile
      ? gallery.map(image => {
          return { src: image.image1.localFile.childImageSharp.fluid.src }
        })
      : null
    return (
      <Layout>
        <div className="post-container">
          <Helmet title={`${post.data.title.text} | ${config.siteTitle}`} />
          <SEO
            location={this.props.location}
            postSEO
            imageSrc={
              post.data
                ? post.data.image.localFile.childImageSharp.fluid.src
                : null
            }
            title={post.data ? post.data.title.text : null}
            description={post.data ? post.data.text.text.slice(0, 200) : null}
          />
          <Wrapper>
            <Hero>
              <h1>{post.data.title.text}</h1>
              <Information>
                <span className="element">
                  <span className="subElement">
                    <GoCalendar size={20} />
                    <h4>{post.data.date}</h4>
                  </span>
                </span>
                <span className="element">
                  <span className="margin subElement">
                    <GoPerson size={20} />
                    <h4>{post.data.author.document[0].data.name}</h4>
                  </span>
                </span>

                {images && (
                  <span className="element">
                    <span className="subElement">
                      <IoIosImages size={20} />
                    </span>
                  </span>
                )}
                {playlist && (
                  <span className="element">
                    <span className="subElement">
                      <GiMusicalNotes size={20} />
                    </span>
                  </span>
                )}
              </Information>
            </Hero>
            <Img fluid={post.data.image.localFile.childImageSharp.fluid} />
          </Wrapper>
          {/* <MainHeader title={post.data.title.text} /> */}
          <Container type="article">
            <Content input={post.data.text.html} />
            {PlaylistPlayer}
            {images ? (
              <div>
                <Grid width={320} gap={24}>
                  {gallery.map((image, index) => (
                    <a
                      key={image.image1.localFile.id}
                      href={image.image1.localFile.childImageSharp.fluid.src}
                      onClick={e => this.openLightbox(index, e)}
                    >
                      <Img
                        key={image.image1.localFile.id}
                        fluid={image.image1.localFile.childImageSharp.fluid}
                      />
                    </a>
                  ))}
                </Grid>
                <Lightbox
                  images={images}
                  isOpen={this.state.lightboxIsOpen}
                  onClickPrev={this.gotoPrevious}
                  onClickNext={this.gotoNext}
                  onClose={this.closeLightbox}
                  currentImage={this.state.currentImage}
                  onClickImage={this.handleClickImage}
                />
              </div>
            ) : null}
            <Line />
            {/* <Tags tags={post.tags} /> */}
            <Flex flexDirection={['column', 'row']} alignItems="center">
              <Box>
                <span className={fontBold}>Ти се допадна?</span> Сподели со
                твоите пријатели
              </Box>
              <Box>
                <Twitter
                  message={post.data.title.text}
                  link={this.props.location.href}
                />
                <Facebook link={this.props.location.href} />
                {/* <Link to={`/categories/${kebabCase(post.category)}`}>{post.category}</Link> */}
              </Box>
            </Flex>
          </Container>
          <Footer>
            {/* <h2>Lust auf mehr Tutorials & Goodies? Werde ein Patron.</h2>
            <a
              href="https://www.patreon.com/lekoarts"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button type="secondary">Patreon</Button>
            </a> */}
          </Footer>
        </div>
      </Layout>
    )
  }
}

export default Post

Post.propTypes = {
  // pageContext: PropTypes.shape({
  //   slug: PropTypes.string.isRequired,
  // }),
  data: PropTypes.shape({
    prismicBlog: PropTypes.object.isRequired,
  }),
}

/* eslint no-undef: "off" */
export const BlogQuery = graphql`
  query SingleBlog($uid: String!) {
    prismicBlog(uid: { eq: $uid }) {
      id
      uid
      slugs
      data {
        body {
          ... on PrismicBlogBodyPlaylist {
            slice_type
            primary {
              playlist_name {
                html
                text
              }
            }
            items {
              link {
                url
              }
              artist
              track
            }
          }
        }
        date
        title {
          html
          text
        }
        text {
          html
          text
        }
        author {
          document {
            data {
              name
            }
          }
        }
        image {
          localFile {
            childImageSharp {
              fluid(
                maxWidth: 1400
                quality: 85
              ) # traceSVG: { color: "#52555e" }
              # duotone: {
              #   highlight: "#262c41"
              #   shadow: "#46507a"
              #   opacity: 45
              # }
              {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        gallery {
          image1 {
            localFile {
              id
              childImageSharp {
                fluid(
                  maxWidth: 900
                  quality: 85 # traceSVG: { color: "#2B2B2F" }
                ) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
