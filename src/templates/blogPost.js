import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

const Template = ({ data, pageContext }) => {
  const { next, prev } = pageContext;

  const {
    markdownRemark: {
      html,
      frontmatter: { title },
    },
  } = data;
  return (
    <div>
      <h1 style={{ fontFamily: 'avenir' }}>{title}</h1>
      <div
        className="blogpost"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: html }}
        style={{
          fontFamily: 'avenir',
        }}
      />

      <div style={{ marginBottom: '1rem', fontFamily: 'avenir' }}>
        {next && (
          <Link to={next.frontmatter.path}>
            Next:
            {`${next.frontmatter.title}`}
          </Link>
        )}
      </div>
      <div style={{ fontFamily: 'avenir' }}>
        {prev && (
          <Link to={prev.frontmatter.path}>
            Prev:
            {`${prev.frontmatter.title}`}
          </Link>
        )}
      </div>
    </div>
  );
};

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

Template.propTypes = {
  data: PropTypes.shape({}).isRequired,
  pageContext: PropTypes.shape({}).isRequired,
};

export default Template;
