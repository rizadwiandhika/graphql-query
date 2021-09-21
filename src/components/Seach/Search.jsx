import React from 'react'

import Popup from '../Popup/Popup'

export default function Search(props) {
  return (
    <>
      <Popup isOpen={props.isOpen} togglePopup={props.togglePopup} />
      <div className="flex py-2 px-6 mx-auto justify-between items-center overflow-hidden rounded-3xl shadow-sm border border-gray-300 h-full">
        <input
          type="text"
          name="activity"
          id="activity"
          value={props.value}
          className="w-10/12  outline-none placeholder-gray-600 focus:placeholder-gray-300"
          placeholder={props.placeholder}
          onChange={props.handleChangeInput}
        />
        <button
          onClick={props.handleSubmitActivity}
          className={`font-semibold text-gray-600 ${
            props.disabled && 'cursor-not-allowed'
          }`}
          disabled={props.disabled}
        >
          Submit
        </button>
      </div>
    </>
  )
}
