import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const HASURA_GRAPHQL_ENDPOINT = 'https://graphql-todolist.hasura.app/v1/graphql'

const client = new ApolloClient({
  uri: HASURA_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
  headers: {
    'content-type': 'application/json',
    'x-hasura-admin-secret':
      'CB705B2zBWRuIhDA9uIXY9pEusH9wZTwhEdwgPb4uGGQZuUCjyceqmUrJKmU8Zfl'
  }
})

export default client

export const GET_USERS_TODOS = gql`
  query GET_USERS_TODOS {
    users {
      id
      name
      todos {
        id
        is_done
        title
      }
    }
  }
`

// Tanda seru pada "$id: Int!" artinya saat passing variable "id", nilainya GA BOLEH NULL
export const GET_USERS_TODOS_BY_ID = gql`
  query GET_USERS_TODOS_BY_ID($id: Int!) {
    todos(where: { user_id: { _eq: $id } }) {
      id
      is_done
      title
    }
  }
`
