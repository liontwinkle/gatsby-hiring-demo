const prodConfig = {
  apiKey: process.env.Firebase_apiKey,
  authDomain: process.env.Firebase_authDomain,
  databaseURL: process.env.Firebase_databaseURL,
  projectId: process.env.Firebase_projectId,
  storageBucket: process.env.Firebase_storageBucket,
  messagingSenderId: process.env.Firebase_messagingSenderId,
}

const devConfig = {
  apiKey: process.env.Firebase_apiKey,
  authDomain: process.env.Firebase_authDomain,
  databaseURL: process.env.Firebase_databaseURL,
  projectId: process.env.Firebase_projectId,
  storageBucket: process.env.Firebase_storageBucket,
  messagingSenderId: process.env.Firebase_messagingSenderId,
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
    this.auth.getRedirectResult().then(result => {
      // If user just signed in or already signed in, hide spinner.
      if (result.user || this.auth.currentUser) {
        console.log('hideSpinner()')
      } else {
        console.log('hideSpinner() showSignInForm()')
      }
    })
  }

  doSignOut = () => this.auth.signOut()

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password)

  // *** User API ***

  doCreateUser = (id, username, email) =>
    this.db.ref(`users/${id}`).set({
      username,
      email,
    })

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
