

import React from "react";
import Link from "gatsby-link";

const IndexPage = ({ data }) => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <ul>
      {data.allStrapiBlog.edges.map(document => (
        <li key={document.node.id}>
          <h2>
            <Link to={`/${document.node.id}`}>{document.node.title}</Link>
          </h2>
          <p>{document.node.text}</p>
        </li>
      ))}
    </ul>
    <Link to="/page-2/">Go to page 2</Link>
  </div>
);

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
    allStrapiBlog {
      edges {
        node {
          id
          title
          text
          author {
            id
            username
          }
          date
          images {
            url
          }
          header_image {
            url
          }
        }
      }
    }
    allStrapiPrograma {
      edges {
        node {
          from
          to
          description
          sreda
          cetvrtok
          petok
          sabota
        }
      }
    }
  }
`;

