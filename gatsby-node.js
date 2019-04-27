const path = require('path');

const createTagPages = (createPage, posts) => {
  const allTagsIndexTemplate = path.resolve('src/templates/allTagsIndex.js');
  const singleTagIndexTemplate = path.resolve(
    'src/templates/singleTagIndex.js'
  );

  const postsByTag = {};

  posts.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        if (!postsByTag[tag]) {
          postsByTag[tag] = [];
        }

        postsByTag[tag].push(node);
      });
    }
  });

  const tags = Object.keys(postsByTag);

  createPage({
    path: '/tags',
    component: allTagsIndexTemplate,
    context: {
      tags: tags.sort(),
    },
  });

  tags.forEach(tagName => {
    createPage({
      path: `/tags/${tagName}`,
      component: singleTagIndexTemplate,
      context: {
        posts: postsByTag[tagName],
        tagName,
      },
    });
  });
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise(resolve => {
    const blogPostTemplate = path.resolve('src/templates/blogPost.js');

    resolve(
      graphql(
        `
          query {
            allMarkdownRemark(
              sort: { order: ASC, fields: [frontmatter___date] }
            ) {
              edges {
                node {
                  frontmatter {
                    path
                    title
                    tags
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        const posts = result.data.allMarkdownRemark.edges;

        createTagPages(createPage, posts);

        posts.forEach(({ node }, index) => {
          const pathSlug = node.frontmatter.path;
          createPage({
            path: pathSlug,
            component: blogPostTemplate,
            context: {
              pathSlug,
              prev: index === 0 ? null : posts[index - 1].node,
              next: index === posts.length - 1 ? null : posts[index + 1].node,
            },
          });

          resolve();
        });
      })
    );
  });
};
