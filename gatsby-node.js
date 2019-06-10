const path = require('path');

const createTagPages = (createPage, posts) => {
  const allTagsIndexTemplate = path.resolve('src/templates/allTagsIndex.js');
  const singleTagIndexTemplate = path.resolve('src/templates/singleTagIndex.js');

  // ** dynamically create a key for each of the tags
  // ** each of the tags will have an array of the posts that use that tag
  const postsByTag = {};

  posts.forEach(({node}) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        // ** check if postsByTag does not have this tag as a key, create it
        if (!postsByTag[tag]) {
          postsByTag[tag] = [];
        }

        postsByTag[tag].push(node);
      });
    }
  });

  // ** now have built-up postsByTag object with each of tags with arr of nodes for each one
  // ** create master list of all of tags
  const tags = Object.keys(postsByTag);

  createPage({
    path: '/tags',
    component: allTagsIndexTemplate,
    context: {
      tags: tags.sort()
    }
  });

  // ** create individual tag pages
  tags.forEach(tagName => {
    const posts = postsByTag[tagName];

    createPage({
      path: `/tags/${tagName}`,
      component: singleTagIndexTemplate,
      context: {
        posts,
        tagName
      }
    });
  });

}


exports.createPages = (({graphql, actions}) => {
  // ?? createPage is in actions, where are actions from - from...
  const { createPage } = actions;

  // ** returns new promise due to async nature of file creation
  return new Promise((resolve, reject) => {
    // import Template component
    const blogPostTemplate = path.resolve('src/templates/blogPost.js');

    // ** Query to find all files, gets path from frontmatter
    // ** get path where want posts to live at
    // ** need to sort the post results for prev nexts
    // ** sort in ascending order based on 
    resolve(
      graphql(
        ` 
        query {
          allMarkdownRemark (
            sort: {order: ASC, fields: [frontmatter___date]}
          ) {
            edges {
              node {
                frontmatter {
                  path,
                  title,
                  tags
                }
              }
            }
          }
        }
        `
      ).then(result => {
        // allow for back forward navigation
        const posts = result.data.allMarkdownRemark.edges;

        // create tag pages
        createTagPages(createPage, posts);

        // contains data object of shape that matches query
        // edges are a path to the filesystem node
        posts.forEach(({node}, index) => {
          const path = node.frontmatter.path;

          createPage({
            path, // for page URL
            component: blogPostTemplate,
            // context goes into blogPostTemplate as a prop
            // add previous and next pages here, pumped into pageContext
            context: {
              pathSlug: path,
              prev: index === 0 ? null : posts[index-1].node,
              next: index === (posts.length-1) ? null : posts[index+1].node
            }
          })

          resolve();
        });
      })
    )
  });
})