import React from 'react';
import {graphql, Link} from 'gatsby';

import styles from './allTags.module.scss';

// ** data is from a query
// ** pageContext gets passed from gatsby-node.js
const AllTagsTemplate = ({data, pageContext}) => {
  const {tags} = pageContext;
  
  return (
    <div className={styles.tagscontainer}>
      <div>
        <ul>
          {tags.map((tagName, index) => (
            <li key={index}>
              <Link to={`/tags/${tagName}`} >
                {tagName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AllTagsTemplate;