import React from 'react'

import { useLazyQuery, useQuery } from '@apollo/client'
import { GET_ANGGOTA, GET_ANGGOTA_BY_ID } from '../api/hasura-graphql'

export default function withGraphQL(Component) {
  return function (props) {
    const anggota = useQuery(GET_ANGGOTA)
    const [lazyGetData, lazy] = useLazyQuery(GET_ANGGOTA_BY_ID)

    return (
      <Component
        lazy={{
          getAnggotaById: (id) => lazyGetData({ variables: { id } }),
          ...lazy
        }}
        anggota={anggota}
        {...props}
      />
    )
  }
}
