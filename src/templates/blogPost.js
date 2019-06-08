import React from 'react';
import {graphql} from 'gatsby';
import styles from './blogPost.module.scss';

const Template = ({data}) => {
  const {markdownRemark} = data;
  // query to get content
  const title = markdownRemark.frontmatter.title;
  const exerpt = markdownRemark.frontmatter.exerpt;
  const html = markdownRemark.html;

  console.log(markdownRemark)


  return (
    <div className={styles.blogPost}>
      <h1 className={styles.title}>{title}</h1>
      <h2 className={styles.subtitle}>{exerpt}</h2>
      <p className={styles.post} dangerouslySetInnerHTML={{__html: html}} />
    </div>
  );
}

// get content using graphql below component
// ** ! in String! means is required
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