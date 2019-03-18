import React from 'react'
import styled from 'styled-components'
// import { StaticQuery, graphql } from 'gatsby'
import { MainWrapper, Hero } from './index'
// import Wave from '../Wave'
import Img from 'gatsby-image'

const Text = styled.div`
  color: ${props => props.theme.colors.white.base};
  z-index: 1000;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  max-width: 1200px;
  padding: 0 2rem;
  margin-bottom: 7rem;
  align-items: center;
`

const Subtitle = styled.p`
  max-width: 650px;
  color: ${props => props.theme.tint.white};
`

const MainHeader = ({ title, subtitle }) => (
  <MainWrapper>
    <Hero>
      <Text>
        <h1>{title}</h1>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </Text>
    </Hero>
  </MainWrapper>
)

// export default props => (
//   <StaticQuery
//     query={pageQuery}
//     render={data => <MainHeader {...props} file={data.file} />}
//   />
// )

// export const pageQuery = graphql`
//   {
//     file(relativePath: { eq: "sektor_2.png" }) {
//       childImageSharp {
//         fluid(
//           maxWidth: 800
//           quality: 75
//           duotone: { highlight: "#262c41", shadow: "#46507a", opacity: 50 }
//         ) {
//           ...GatsbyImageSharpFluid_withWebp_tracedSVG
//         }
//       }
//     }
//   }
// `
export default MainHeader
