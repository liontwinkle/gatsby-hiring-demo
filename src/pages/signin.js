import React, { Fragment } from 'react'

import LayoutFirebase from '../components/LayoutFirebase'
import Layout from '../components/Layout'
import SignInForm from '../components/SignIn'
// import { SignUpLink } from '../components/SignUp'
// import { PasswordForgetLink } from '../components/PasswordForget'
import Footer from '../components/Footer'
import Container from '../components/Container'
import MainHeader from '../components/LayoutComponents/MainHeader'
import AuthUserContext from '../components/Session/AuthUserContext'

const SignInPage = ({ path }) => (
  <Fragment>
    {/* <h1>SignIn</h1> */}
    <AuthUserContext.Consumer>
      {authUser => <SignInForm path={path} authUser={authUser} />}
    </AuthUserContext.Consumer>
    {/* <PasswordForgetLink />
    <SignUpLink /> */}
  </Fragment>
)

export default data => {
  const path = data.location.pathname
  const file = data.data.file
  return (
    <Layout>
      <LayoutFirebase>
        <MainHeader file={file} />
        <Container>
          <SignInPage path={path} />
        </Container>
        <Footer />
      </LayoutFirebase>
    </Layout>
  )
}

export const pageQuery = graphql`
  {
    file(relativePath: { eq: "sektor_2.png" }) {
      childImageSharp {
        fluid(
          maxWidth: 800
          quality: 75
          duotone: { highlight: "#262c41", shadow: "#46507a", opacity: 50 }
        ) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
