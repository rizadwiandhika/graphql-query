import React from 'react'

import Popup from '../Popup/Popup'

export default function Search(props) {
  return (
    <>
      <Popup isOpen={props.isOpen} togglePopup={props.togglePopup} />
      <div className="flex h-12 py-2 px-6 mx-auto justify-between overflow-hidden rounded-3xl shadow-sm border border-gray-300">
        <input
          type="text"
          name="activity"
          id="activity"
          value={props.value}
          className="w-10/12  outline-none placeholder-gray-600 focus:placeholder-gray-300"
          placeholder="Add todo..."
          onChange={props.handleChangeInput}
        />
        <button
          onClick={props.handleSubmitActivity}
          className="font-semibold text-gray-600 "
        >
          Submit
        </button>
      </div>
    </>
  )
}
