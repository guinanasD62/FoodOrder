import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import React from 'react'

const Loading = () => {
    return (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999 }}>

            <img src='/Spinner.svg' alt='Loading...' />

        </div>
    )
}

export default Loading