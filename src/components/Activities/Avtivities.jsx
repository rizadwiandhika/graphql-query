import React from 'react'
import ActivityList from './ActivityList'

export default function Avtivities(props) {
  return (
    <ul className="mx-auto mt-4">
      {props.activities.map((act) => {
        return (
          <ActivityList
            {...act}
            key={act.id}
            handleToggleActivity={props.handleToggleActivity}
            handleDeleteActivity={props.handleDeleteActivity}
          />
        )
      })}
    </ul>
  )
}
