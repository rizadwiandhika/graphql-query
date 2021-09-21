import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const HASURA_GRAPHQL_ENDPOINT = 'https://boss-gelding-10.hasura.app/v1/graphql'

const client = new ApolloClient({
  uri: HASURA_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
  headers: {
    'content-type': 'application/json',
    'x-hasura-admin-secret':
      'il1ApMjS9BUc55GKzLyc7dWN1Y6VRmt2xHo7dTeZILd1TYZb9RvX4yMQgBfD4P6x'
  }
})

export default client

export const GET_ANGGOTA = gql`
  query GET_ANGGOTA {
    anggota {
      nama
      umur
      id
      jenis_kelamin
      keterangans {
        id
        id_anggota
        nilai
        pelajaran
        status
      }
    }
  }
`

// Tanda seru pada "$id: Int!" artinya saat passing variable "id", nilainya GA BOLEH NULL
export const GET_ANGGOTA_BY_ID = gql`
  query GET_ANGGOTA_BY_ID($id: Int!) {
    anggota_by_pk(id: $id) {
      id
      jenis_kelamin
      nama
      umur
      keterangans {
        id
        id_anggota
        nilai
        pelajaran
        status
      }
    }
  }
`
