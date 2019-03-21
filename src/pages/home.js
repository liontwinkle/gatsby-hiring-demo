import React, { Component } from 'react'

import LayoutFirebase from '../components/LayoutFirebase'
import Layout from '../components/Layout'
import withAuthorization from '../components/Session/withAuthorization'
import Footer from '../components/Footer'
import Container from '../components/Container'
import MainHeader from '../components/LayoutComponents/MainHeader'
import { graphql } from 'gatsby'

const fromObjectToList = object =>
  object ? Object.keys(object).map(key => ({ ...object[key], index: key })) : []

class HomePageBase extends Component {
  constructor(props) {
    super(props)

    this.state = {
      initFirebase: false,
      users: [],
    }
  }

  firebaseInit = () => {
    if (this.props.firebase && !this.state.initFirebase) {
      this.props.firebase.onceGetUsers().then(snapshot =>
        this.setState(() => ({
          users: fromObjectToList(snapshot.val()),
        }))
      )

      this.setState({ initFirebase: true })
    }
  }

  componentDidMount() {
    this.firebaseInit()
  }

  componentDidUpdate() {
    this.firebaseInit()
  }

  render() {
    const { users } = this.state

    return (
      <React.Fragment>
        <Container>
          <p>Содржина достапна само на регистрирани членови</p>

          {!!users.length && <UserList users={users} />}
        </Container>
      </React.Fragment>
    )
  }
}

const UserList = ({ users }) => (
  <div>
    <h2>Корисничка зона</h2>
    {users.map(user => (
      <div key={user.index}>{user.index}</div>
    ))}
  </div>
)

const authCondition = authUser => !!authUser

const HomePage = withAuthorization(authCondition)(HomePageBase)

export default ({ data: { file } }) => (
  <Layout>
    <LayoutFirebase>
      <MainHeader file={file} />
      <HomePage />
      <Footer />
    </LayoutFirebase>
  </Layout>
)

export const HomeQuery = graphql`
  query HomeQuery {
    file(relativePath: { eq: "sektor_2.png" }) {
      childImageSharp {
        fluid(
          maxWidth: 800
          quality: 75
          duotone: { highlight: "#262c41", shadow: "#46507a", opacity: 50 }
        ) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
  }
`
