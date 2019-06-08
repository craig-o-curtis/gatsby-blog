const path = require('path');

exports.createPages = (({graphql, actions}) => {
  // ?? createPage is in actions, where are actions from
  const { createPage } = actions;

  // ** returns new promise due to async nature of file creation
  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('src/templates/blogPost.js');

    // get path where want posts to live at
    resolve(
      graphql(
        `
        query {
          allMarkdownRemark {
            edges {
              node {
                frontmatter {
                  path
                }
              }
            }
          }
        }
        `
      ).then(result => {
        // contains data object of shape that matches query
        // edges are a path to the filesystem node
        result.data.allMarkdownRemark.edges.forEach(({node}) => {
          const path = node.frontmatter.path;

          createPage({
            path, // for page URL
            component: blogPostTemplate,
            // context goes into blogPostTemplate as a prop
            context: {
              pathSlug: path
            }
          })

          resolve();
        });
      })
    )
  });
})