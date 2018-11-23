import React from 'react'

import AuthUserContext from './AuthUserContext'
import { withFirebase } from '../Firebase/FirebaseContext'

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        initFirebase: false,
        authUser: null,
      }
    }

    firebaseInit = () => {
      if (this.props.firebase && !this.state.initFirebase) {
        console.log('Init Firebase in WITH AUTH')
        this.props.firebase.auth.onAuthStateChanged(authUser => {
          console.log('AUTH USER IN WITH AUTH: ', authUser)
          authUser
            ? this.setState(() => ({ authUser, initFirebase: true }))
            : this.setState(() => ({
                authUser: null,
                initFirebase: true,
              }))
        })
      }
    }

    componentDidMount() {
      this.firebaseInit()
    }

    componentDidUpdate() {
      this.firebaseInit()
    }

    render() {
      const { authUser } = this.state

      return (
        <AuthUserContext.Provider value={authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      )
    }
  }

  return withFirebase(WithAuthentication)
}

export default withAuthentication
