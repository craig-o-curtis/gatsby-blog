import React from 'react';
import {graphql, Link} from 'gatsby';

import styles from './singleTag.module.scss';

const SingleTagTemplate = ({data, pageContext}) => {
  const {posts, tagName} = pageContext;



  return (
    <div className={styles.tagcontainer}>
      <div>
        Posts about {`${tagName}`}:
      </div>
      <div>
        <ul>
          {posts.map((post, index) => (
            <li key={index}>
              <Link to={post.frontmatter.path}>
                {post.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SingleTagTemplate;