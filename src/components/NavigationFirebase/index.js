import React from 'react'
import { Link } from 'gatsby'

import * as routes from '../../constants/routes'
import AuthUserContext from '../Session/AuthUserContext'
import SignOutButton from '../SignOut'

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
  </AuthUserContext.Consumer>
)

const NavigationAuth = () => (
  <React.Fragment>
    <Link to={routes.HOME}>Home</Link>
    <Link to={routes.ACCOUNT}>Account</Link>
    <SignOutButton />
  </React.Fragment>
)

const NavigationNonAuth = () => (
  <React.Fragment>
    <Link to={routes.SIGN_IN}>Sign In</Link>
  </React.Fragment>
)

export default Navigation
