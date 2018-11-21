import React, { Fragment } from 'react'

import LayoutFirebase from '../components/LayoutFirebase'
import Layout from '../components/Layout'
import SignInForm from '../components/SignIn'
import { SignUpLink } from '../components/SignUp'
import { PasswordForgetLink } from '../components/PasswordForget'

const SignInPage = () => (
  <Fragment>
    <h1>SignIn</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </Fragment>
)

export default () => (
  <Layout>
    <LayoutFirebase>
      <SignInPage />
    </LayoutFirebase>
  </Layout>
)
