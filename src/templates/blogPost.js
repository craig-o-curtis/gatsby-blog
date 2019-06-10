import React from 'react';
import {graphql, Link} from 'gatsby';
import styles from './blogPost.module.scss';

/**
 * Avail props
 * @param {*, children, data, location, navigation, pageContext, pageResources, path, pathContent, uri} props 
 */
const Template = ({data, pageContext}) => {

  
  const {next, prev} = pageContext;
  
  
  const {markdownRemark} = data;
  // query to get content
  const title = markdownRemark.frontmatter.title;
  const exerpt = markdownRemark.frontmatter.exerpt;
  const html = markdownRemark.html;

  return (
    <div className={styles.blogPost}>
      <h1 className={styles.title}>{title}</h1>
      <h2 className={styles.subtitle}>{exerpt}</h2>
      <p className={styles.post} dangerouslySetInnerHTML={{__html: html}} />

      <div className={styles.links}>
      {prev && <Link to={prev.frontmatter.path} className={styles.link}>&lt;&lt; Previous</Link>}
      {next && <Link to={next.frontmatter.path} className={styles.link}>Next &gt;&gt;</Link>}
      </div>

    </div>
  );
}

// ** This is necessary to load the markdown
// get content using graphql below component
// ** ! in String! means is required
// ** at frist find the path that is equal to the pathSlug
export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: {eq: $pathSlug}}) {
      html,
      frontmatter {
        title,
        exerpt
      }
    }
  }
`;
 
export default Template;