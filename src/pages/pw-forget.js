import React, { Fragment } from 'react'

import LayoutFirebase from '../components/LayoutFirebase'
import Layout from '../components/Layout'
import PasswordForgetForm from '../components/PasswordForget'

const PasswordForgetPage = () => (
  <Fragment>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </Fragment>
)

export default () => (
  <Layout>
    <LayoutFirebase>
      <PasswordForgetPage />
    </LayoutFirebase>
  </Layout>
)
