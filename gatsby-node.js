const path = require('path');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const postTemplate = path.resolve('src/templates/post.js');

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            html
            id
            frontmatter {
              path
              title
              date
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) {
      return Promise.reject(res.errors);
    }

    res.data.allMarkdownRemark.edges.forEach(({ node }) => {
      boundActionCreators.createPage({
        path: node.frontmatter.path,
        component: postTemplate,
      });
    });
  });
};
