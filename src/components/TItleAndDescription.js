import React from "react";

const TitleAndDescription = ({data}) => {
  const title = data.site.siteMetadata.title;
  const description = data.site.siteMetadata.description;

  return (
    <header>
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  );
}

export default TitleAndDescription;