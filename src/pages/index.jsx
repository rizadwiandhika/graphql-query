import React, { useState, useEffect } from 'react'

import { v4 as uuidv4 } from 'uuid'
import { useQuery, useLazyQuery } from '@apollo/client'
import { GET_USERS_TODOS, GET_USERS_TODOS_BY_ID } from '../api/apollo-client'

import Activities from '../components/Activities/Avtivities'
import Search from '../components/Seach/Search'

export default function Index(props) {
  const [activities, setActivities] = useState([])
  const [inputActivity, setinputActivity] = useState('')
  const [inputUserId, setinputUserId] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  // * refetch digunaakn untuk ngedapetin datanya lagi
  // const { data, loading, error, refetch } = useQuery(GET_USERS_TODOS)

  // lazy query mereturn fungsi getData dan object (isinya data, loading, error, refetch, dll.).
  // Ketika getData, dijalankan baru si object akan berisikan query data
  const [getData, lazy] = useLazyQuery(GET_USERS_TODOS_BY_ID)

  /* 
  useEffect(() => {
    if (!data) return

    const DEFAULT_USER_ID = 0
    const todos = data.users[DEFAULT_USER_ID].todos.map((todo) => ({
      id: todo.id,
      activity: todo.title,
      finished: todo.is_done
    }))

    setActivities(todos)
  }, [data]) 
  */

  useEffect(() => {
    if (!lazy.data) return

    const todos = lazy.data.todos.map((todo) => ({
      id: todo.id,
      activity: todo.title,
      finished: todo.is_done
    }))

    setActivities(todos)
    setinputUserId('')
  }, [lazy.data])

  function handleChangeInput(event) {
    setinputActivity(event.target.value)
  }

  function handleSubmitActivity() {
    if (!inputActivity) return togglePopup(true)

    const newActivities = {
      id: uuidv4(),
      activity: inputActivity,
      finished: false
    }

    setActivities([...activities, newActivities])
    setinputActivity('')
    setIsOpen(false)
  }

  function handleToggleActivity(id) {
    setActivities((prev) =>
      prev.map((act) =>
        act.id === id ? { ...act, finished: !act.finished } : act
      )
    )
  }

  function handleDeleteActivity(id) {
    setActivities(activities.filter((act) => act.id !== id))
  }

  function togglePopup(status) {
    setIsOpen(status)
  }

  function handleChangeInputUserId(event) {
    setinputUserId(event.target.value)
  }

  function handleGetTodos() {
    getData({ variables: { id: inputUserId } })
  }

  /* if (lazy.loading) {
    return <h1>Fetching data with GraphQL...</h1>
  }

  if (lazy.error) {
    console.log(lazy.error)
    return <h1> GraphQL query failed :'</h1>
  } */

  return (
    <div className="w-10/12 max-w-screen-md mx-auto">
      <div className="my-12">
        <h1 className="w-min mx-auto my-4 font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-yellow-300 via-green-400 to-blue-500">
          Todos
        </h1>
      </div>

      <Search
        value={inputActivity}
        handleChangeInput={handleChangeInput}
        handleSubmitActivity={handleSubmitActivity}
        isOpen={isOpen}
        togglePopup={togglePopup}
        placeholder="Add todo..."
      />

      <Activities
        activities={activities}
        handleToggleActivity={handleToggleActivity}
        handleDeleteActivity={handleDeleteActivity}
      />

      <div className=" relative mt-12 text-center ">
        <div className="max-w-xs mx-auto h-8 ">
          <Search
            value={inputUserId}
            handleChangeInput={handleChangeInputUserId}
            handleSubmitActivity={handleGetTodos}
            isOpen={false}
            placeholder="Search user..."
            disabled={lazy.loading}
          />
        </div>

        {lazy.loading && (
          <h1 className="my-8 text-xl text-center">Fetching data...</h1>
        )}
        {lazy.error && (
          <h1 className="my-8 text-xl text-center">
            Failed fetching user's data {':('}
          </h1>
        )}
      </div>
    </div>
  )
}
