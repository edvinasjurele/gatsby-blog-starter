import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import Header from '../components/Header';

const Layout = ({ data }) => {
  const {
    allMarkdownRemark: { edges },
  } = data;
  return (
    <div>
      <Header />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontFamily: 'avenir',
        }}
      >
        {edges.map(edge => {
          const { frontmatter } = edge.node;
          return (
            <div key={frontmatter.path} style={{ marginBottom: '1rem' }}>
              <Link to={frontmatter.path}>{frontmatter.title}</Link>
            </div>
          );
        })}

        <p>- - -</p>
        <div>
          <Link to="/tags">Browse by Tag</Link>
        </div>
      </div>
    </div>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            title
            path
            date
          }
        }
      }
    }
  }
`;

Layout.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default Layout;
