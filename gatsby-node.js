const path = require('path')
const _ = require('lodash')

const pathPrefixes = {
  posts: '/blog',
  events: '/nastani',
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const postPage = path.resolve('src/templates/nastan.jsx')
    const blogPage = path.resolve('src/templates/post.jsx')
    resolve(
      graphql(`
        {
          allStrapiPrograma(sort: { fields: [from], order: DESC }) {
            edges {
              node {
                path
              }
            }
          }
          allStrapiBlog {
            edges {
              node {
                id
                path
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          /* eslint no-console: "off" */
          console.log(result.errors)
          reject(result.errors)
        }

        result.data.allStrapiPrograma.edges.forEach(edge => {
          createPage({
            path: `programa/${edge.node.path}`,
            component: postPage,
            context: {
              slug: edge.node.path,
            },
          })
        })
        result.data.allStrapiBlog.edges.forEach(edge => {
          createPage({
            path: `blog/${edge.node.path}`,
            component: blogPage,
            context: {
              slug: edge.node.path,
            },
          })
        })
      })
    )
  })
}
