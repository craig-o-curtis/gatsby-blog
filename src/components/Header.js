import React from "react";
// graphql
import { StaticQuery, graphql } from 'gatsby'
// components 
import TitleAndDescription from './TItleAndDescription';

const Header = () => {
  return (
    // use Graphql query  
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
              description
            }
          }
        }
      `}
      render={data => (
        <TitleAndDescription data={data} />
      )}
    />
  )
}

export default Header;