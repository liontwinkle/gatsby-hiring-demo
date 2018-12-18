import React, { Component } from 'react'
import { navigate } from 'gatsby'

import * as routes from '../../constants/routes'
import { withFirebase } from '../Firebase/FirebaseContext'
import Button from '../Button'
import Loader from '../Loader'

class SignInForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
    }
  }

  onFbSubmit = event => {
    console.log('Signing with FB')
    sessionStorage.setItem('signInLoader', 'true')
    this.props.firebase.doSignInWithFacebook().catch(error => {
      console.log('Error, ', error)
      this.setState({ error })
    })

    event.preventDefault()
  }

  componentDidMount() {
    console.log('Component did mount, auth user: ', this.props.authUser)
    const loading =
      window.sessionStorage.getItem('signInLoader') === 'true' &&
      !this.props.authUser
    this.setState({ loading: loading })
    console.log('Loading: ', loading)
    if (this.props.firebase) {
      this.props.firebase.doOnRedirect()
    }
    if (this.props.authUser) {
      window.sessionStorage.removeItem('signInLoader')
      console.log('Navigating to home')
      navigate(routes.HOME)
    }
  }

  componentDidUpdate() {
    // const loading = window.sessionStorage.getItem('loading') === 'true'
    // this.setState({ loading: loading })
    console.log('Component did update', this.props.authUser)
    if (this.props.firebase) {
      this.props.firebase.doOnRedirect()
    }
    console.log('Path: ', this.props.path)
    if (
      this.props.authUser &&
      (this.props.path === '/signin/' || this.props.path === '/signin')
    ) {
      window.sessionStorage.removeItem('signInLoader')
      navigate(routes.HOME)
    }
  }

  componentWillUnmount() {
    window.sessionStorage.removeItem('signInLoader')
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <Loader />
        ) : (
          <Button size="large" onClick={this.onFbSubmit} type="primary">
            Најави се
          </Button>
        )}
      </div>
    )
  }
}

export default withFirebase(SignInForm)
