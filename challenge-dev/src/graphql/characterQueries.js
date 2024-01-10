import { gql } from '@apollo/client';

const ALL_CHARACTERS = gql`
query characters(
  $name: String
  $status: String
  $species: String
  $gender: String
  $page: Int
) {
  characters(
    filter: {
      name: $name
      status: $status
      species: $species
      gender: $gender
    }
    page: $page
  ) {
    info {
      pages
      next
      prev
    }
    results {
      id
      name
      image
    }
  }
}
`;

const GET_CHARACTER = gql`
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        name
        dimension
      }
      location {
        name
        dimension
      }
      image
    }
  }
`;

const GET_CHARACTER_BY_NAME = gql`
  query characters($name: String! , $page: Int) {
    characters(filter: { name: $name }, page: $page) {
      info{
        pages
        next
        prev
      }
      results {
        id
        name
        image
      }
    }
  }
`;


export { ALL_CHARACTERS, GET_CHARACTER, GET_CHARACTER_BY_NAME };