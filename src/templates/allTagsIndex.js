import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const AllTagsTemplate = ({ pageContext }) => {
  const { tags } = pageContext;
  return (
    <div style={{ fontFamily: 'avenir' }}>
      <div>
        <ul>
          {tags.map((tagName, index) => {
            return (
              <li key={index}>
                <Link to={`/tags/${tagName}`}>{tagName}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

AllTagsTemplate.propTypes = {
  pageContext: PropTypes.shape({}).isRequired,
};

export default AllTagsTemplate;
