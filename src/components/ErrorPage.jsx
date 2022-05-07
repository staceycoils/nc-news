import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function ErrorPage(props) {
    const { error, type } = props
    const navigate = useNavigate();

    function returnToParent(e) {
        e.preventDefault();
        navigate(-1)
    }

    const notFound = (
        <div className='errorpage'>
            <h3>Error {error.err.response.status}</h3>
            <h3>ID not found :&#40;</h3>
            <p>
                We have not been able to locate the {type} requested.<br /> 
                This {type} may have been deleted, or entered incorrectly.<br />
                Please confirm the ID you are trying access is correct.<br />
                If you continue to see this message, please contact us via GitHub.<br />
            </p>
            <button 
            className='buttonback'
            onClick={returnToParent} >
            Back
        </button>
        </div>
    )

    const badRequest = (
        <div className='errorpage'>
            <h3>Error {error.err.response.status}</h3>
            <h3>{error.err.response.statusText}</h3>
            <p>
                We have been unable to process this request.<br /> 
                Please correct any errors in the address and retry.<br />
                If you continue to see this message, please contact us via GitHub.<br />
            </p>
            <button 
            className='buttonback'
            onClick={returnToParent} >
            Back
            </button>
        </div>
    )

    const serverError = (
        <div className='errorpage'>
            <h3>Error {error.err.response.status}</h3>
            <h3>{error.err.response.statusText}</h3>
            <p>
                Our server has been unable to process this request.<br /> 
                Please try again shortly.<br />
                If you continue to see this message, please contact us via GitHub.<br />
                We apologise for the inconvenience.
            </p>
            <button 
            className='buttonback'
            onClick={returnToParent} >
            Back
            </button>
        </div>
    )

    function handleError({err}) {
        if (err.response.status === 404) return notFound
        if (err.response.status === 400) return badRequest
        else return serverError
    }

  return (
    <div>
        {handleError(error)}
    </div>
  )
}
