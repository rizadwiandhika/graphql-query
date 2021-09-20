import React from 'react'
import { Helmet } from 'react-helmet'
import Index from './pages'

function App() {
  return (
    <>
      <Helmet>
        <title>Todo App</title>
      </Helmet>
      <Index />
    </>
  )
}

export default App
