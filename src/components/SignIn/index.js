import React, { Component } from 'react'
import { navigate } from 'gatsby'

import * as routes from '../../constants/routes'
import { withFirebase } from '../Firebase/FirebaseContext'
import Button from '../Button'

import AuthUserContext from '../Session/AuthUserContext'

// const INITIAL_STATE = {
//   loading: false,
// }
class SignInForm extends Component {
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     loading: window.sessionStorage.getItem('loading') === 'true',
  //   }
  // }

  // onSubmit = event => {
  //   const { email, password } = this.state

  //   this.props.firebase
  //     .doSignInWithEmailAndPassword(email, password)
  //     .then(() => {
  //       this.setState(() => ({ ...INITIAL_STATE }))
  //       navigate(routes.HOME)
  //     })
  //     .catch(error => {
  //       this.setState({ error })
  //     })

  //   event.preventDefault()
  // }

  onFbSubmit = event => {
    console.log('Signing with FB')
    this.props.firebase.doSignInWithFacebook().catch(error => {
      console.log('Error, ', error)
      this.setState({ error })
    })

    event.preventDefault()
  }

  componentDidMount() {
    console.log('Component did mount', this.props.authUser)
    if (this.props.firebase) {
      this.props.firebase.doOnRedirect()
    }
    if (this.props.authUser) {
      navigate(routes.HOME)
    }
  }

  componentDidUpdate() {
    console.log('Component did update', this.props.authUser)
    if (this.props.firebase) {
      this.props.firebase.doOnRedirect()
    }
    // if (this.props.authUser) {
    //   navigate(routes.LANDING)
    // }
  }

  render() {
    // const { email, password, error } = this.state

    // const isInvalid = password === '' || email === ''
    return (
      <div>
        {/* <form onSubmit={this.onSubmit}>
          <input
            name="email"
            value={email}
            onChange={event =>
              this.setState({ [event.target.name]: event.target.value })
            }
            type="text"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={password}
            onChange={event =>
              this.setState({ [event.target.name]: event.target.value })
            }
            type="password"
            placeholder="Password"
          />
          <button disabled={isInvalid} type="submit">
            Sign In
          </button>

          {error && <p>{error.message}</p>}
        </form> */}
        <Button onClick={this.onFbSubmit} type="primary">
          Најави се
        </Button>
      </div>
    )
  }
}

export default withFirebase(SignInForm)
