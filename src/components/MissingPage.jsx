import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function MissingPage() {
    const navigate = useNavigate();

    function returnToParent(e) {
        e.preventDefault();
        navigate(-1)
    }
  return (
    <div className='errorpage'>
        <h2>
            Page not Found
        </h2>
        <p className='errorpage__text'>
            The address you have tried to access does not exist.<br />
            Please check the location you are trying to access is correct.<br />
        </p>
        <button 
            className='buttonback'
            onClick={returnToParent} >
            Back
        </button>
    </div>
  )
}
