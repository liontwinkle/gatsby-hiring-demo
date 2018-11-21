import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { MainWrapper, Hero } from './Index'
import Wave from '../Wave'
import Img from 'gatsby-image'

const MainHeader = ({ file }) => (
  <MainWrapper>
    <Hero>
      <h1>#OURGOALISTHEFUTURE</h1>
    </Hero>
    <Wave />
    <Img fluid={file.childImageSharp.fluid} />
  </MainWrapper>
)

export default () => (
  <StaticQuery
    query={pageQuery}
    render={data => <MainHeader file={data.file} />}
  />
)

export const pageQuery = graphql`
  {
    file(relativePath: { eq: "sektor_2.png" }) {
      childImageSharp {
        fluid(
          maxWidth: 800
          quality: 75
          duotone: { highlight: "#262c41", shadow: "#46507a", opacity: 50 }
        ) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
  }
`
