import React from "react";
// graphql
import { graphql, Link } from 'gatsby';
// Components
import Header from '../components/Header';
// Styles
import styles from './index.module.scss';

const Layout = ({data}) => {
  // get metadata from project structure
  // / edges are the pages in the pages directory
  const { edges } = data.allMarkdownRemark;

  return (
    <div className={styles.Layout}>
      <Header />
      {edges.map((edge, idx) => {
        const {frontmatter} = edge.node;
      
        return (
          <div key={`${frontmatter.path}-${idx}`}>
            <Link to={frontmatter.path}>
              {frontmatter.title}
            </Link>
          </div>
        )
      })}

      {/* All tags */}
      <div>
        <Link to={'/tags'}>Browse all tags</Link>
      </div>
    </div>
  );
}

export const query = graphql`
  query HomepageQuery {
      allMarkdownRemark(
        sort: {order: DESC, fields: [frontmatter___date]}
      ) {
      edges {
        node {
          frontmatter {
            title
            exerpt
            path
          }
        }
      }
    }
  }
`;

export default Layout;
