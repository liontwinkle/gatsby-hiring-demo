const prodConfig = {
  apiKey: process.env.GATSBY_Firebase_apiKey,
  authDomain: process.env.GATSBY_Firebase_authDomain,
  databaseURL: process.env.GATSBY_Firebase_databaseURL,
  projectId: process.env.GATSBY_Firebase_projectId,
  storageBucket: process.env.GATSBY_Firebase_storageBucket,
  messagingSenderId: process.env.GATSBY_Firebase_messagingSenderId,
}

const devConfig = {
  apiKey: process.env.GATSBY_Firebase_apiKey,
  authDomain: process.env.GATSBY_Firebase_authDomain,
  databaseURL: process.env.GATSBY_Firebase_databaseURL,
  projectId: process.env.GATSBY_Firebase_projectId,
  storageBucket: process.env.GATSBY_Firebase_storageBucket,
  messagingSenderId: process.env.GATSBY_Firebase_messagingSenderId,
}

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig

class Firebase {
  constructor(app) {
    app.initializeApp(config)

    this.db = app.database()
    this.auth = app.auth()
    this.fbProvider = new app.auth.FacebookAuthProvider()
    // this.loadingUser = false
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)

  doSignInWithFacebook = () => {
    console.log('FB Provider', this.fbProvider)
    console.log('Auth', this.auth)
    return this.auth.signInWithRedirect(this.fbProvider)
  }

  doOnRedirect = () => {
    console.log('Getting Redirect result')
    console.log('Current user: ', this.auth.currentUser)
    this.auth
      .getRedirectResult()
      .then(result => {
        // If user just signed in or already signed in, hide spinner.
        if (result.credential) {
          // const isNewUser = result.additionalUserInfo.isNewUser
          console.log('Result: ', result)
          const uid = result.user.uid
          const providerId = result.credential.providerId
          const firstName = result.additionalUserInfo.profile.first_name
          const lastName = result.additionalUserInfo.profile.last_name
          const email = result.additionalUserInfo.profile.email
          const photoUrl = result.additionalUserInfo.profile.picture.data.url
          this.doCreateUser(
            uid,
            providerId,
            firstName,
            lastName,
            photoUrl,
            email
          )
        }
      })
      .catch(function(error) {
        console.log(error)
        // Handle Errors here.
        const errorCode = error.code
        console.log('Error code: ', errorCode)
        const errorMessage = error.message
        console.log('Error message: ', errorMessage)
        // The email of the user's account used.
        // const email = error.email
        // The firebase.auth.AuthCredential type that was used.
        // const credential = error.credential
      })
  }

  doCreateUser = (uid, providerId, firstName, lastName, photoUrl, email) => {
    this.db.ref(`users/${uid}`).set({
      firstName,
      lastName,
      photoUrl,
      providerId,
      email,
    })
  }

  doSignOut = () => this.auth.signOut()

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password)

  onceGetUsers = () => this.db.ref('users').once('value')
}

let firebase

function getFirebase(app, auth, database) {
  if (firebase) {
    return firebase
  }

  firebase = new Firebase(app, auth, database)

  return firebase
}

export default getFirebase
