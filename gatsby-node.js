const path = require('path')
const _ = require('lodash')

const pathPrefixes = {
  posts: '/blog',
  events: '/nastani',
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const postPage = path.resolve('src/templates/nastan.jsx')
    const blogPage = path.resolve('src/templates/post.jsx')
    const djpage = path.resolve('src/templates/dj.jsx')
    resolve(
      graphql(`
        {
          allPrismicNastan(sort: { fields: [data___date], order: DESC }) {
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
          allPrismicDj {
            edges {
              node {
                id
                uid
                data {
                  name
                }
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
        result.data.allPrismicNastan.edges.forEach(edge => {
          createPage({
            path: `nastani/${edge.node.uid}`,
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
        result.data.allPrismicDj.edges.forEach(edge => {
          createPage({
            path: `djs/${edge.node.uid}`,
            component: djpage,
            context: {
              uid: edge.node.uid,
            },
          })
        })
      })
    )
  })
}
