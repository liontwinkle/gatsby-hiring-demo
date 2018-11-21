import React, { Fragment } from 'react'

import LayoutFirebase from '../components/LayoutFirebase'
import Layout from '../components/Layout'
import SignUpForm from '../components/SignUp'

const SignUpPage = () => (
  <Fragment>
    <h1>SignUp</h1>
    <SignUpForm />
  </Fragment>
)

export default () => (
  <Layout>
    <LayoutFirebase>
      <SignUpPage />
    </LayoutFirebase>
  </Layout>
)
