import React from 'react'

import LayoutFirebase from '../components/LayoutFirebase'
import Layout from '../components/Layout'
import AuthUserContext from '../components/Session/AuthUserContext'
import PasswordForgetForm from '../components/PasswordForget'
import PasswordChangeForm from '../components/PasswordChange'
import withAuthorization from '../components/Session/withAuthorization'

const AccountPageBase = () => (
  <Layout>
    <React.Fragment>
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <h1>Account: {authUser.email}</h1>
            <PasswordForgetForm />
            <PasswordChangeForm />
          </div>
        )}
      </AuthUserContext.Consumer>
    </React.Fragment>
  </Layout>
)

const authCondition = authUser => !!authUser

const AccountPage = withAuthorization(authCondition)(AccountPageBase)

export default () => (
  <Layout>
    <LayoutFirebase>
      <AccountPage />
    </LayoutFirebase>
  </Layout>
)
