/**
 * Nama: Riza Dwi Andhika
 * Kelas: E
 * Asal: Institut Teknologi Sepuluh Nopember
 *
 * Task - React Hooks
 */

import React, { useState, useEffect } from 'react'

import { v4 as uuidv4 } from 'uuid'

import Activities from '../components/Activities/Avtivities'
import Search from '../components/Seach/Search'

import illustration from '../assets/illustration.svg'

export default function Index(props) {
  const [activities, setActivities] = useState([])
  const [inputActivity, setinputActivity] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const data = [
      { id: uuidv4(), activity: 'Write a song', finished: false },
      { id: uuidv4(), activity: 'Go to guitar lesson', finished: false }
    ]

    setActivities(data)
  }, [])

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
      />

      <Activities
        activities={activities}
        handleToggleActivity={handleToggleActivity}
        handleDeleteActivity={handleDeleteActivity}
      />

      {activities.length === 0 && (
        <div className="hidden sm:block relative mt-12 opacity-50">
          <img
            className="block w-8/12 mx-auto"
            src={illustration}
            alt="undraw_empty_street_sfxm"
          />
          <p className="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 text-center font-bold text-lg text-gray-800">
            No activities...
          </p>
        </div>
      )}
    </div>
  )
}
