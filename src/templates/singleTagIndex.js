import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const SingleTagTemplate = ({ pageContext }) => {
  const { posts, tagName } = pageContext;
  return (
    <div style={{ fontFamily: 'avenir' }}>
      <div>
        Posts about
        {`${tagName}`}
      </div>
      <div>
        <ul>
          {posts.map((post, index) => {
            return (
              <li key={index}>
                <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

SingleTagTemplate.propTypes = {
  pageContext: PropTypes.shape({}).isRequired,
};

export default SingleTagTemplate;
