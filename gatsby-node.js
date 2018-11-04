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
          allPrismicPrograma(sort: { fields: [data___from], order: DESC }) {
            edges {
              node {
                id
                uid
                slugs
              }
            }
          }
          allPrismicBlog {
            edges {
              node {
                id
                uid
                slugs
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
        result.data.allPrismicPrograma.edges.forEach(edge => {
          createPage({
            path: `program/${edge.node.uid}`,
            component: postPage,
            context: {
              uid: edge.node.uid,
            },
          })
        })
        result.data.allPrismicBlog.edges.forEach(edge => {
          createPage({
            path: `blog/${edge.node.uid}`,
            component: blogPage,
            context: {
              uid: edge.node.uid,
            },
          })
        })
      })
    )
  })
}
