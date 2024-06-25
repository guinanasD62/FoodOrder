import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import React from 'react'

const Loading = () => {
    return (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999 }}>
            {/* <Box sx={{ display: 'center' }}>
                <CircularProgress />
            </Box> */}

            <img src='/Spinner.svg' alt='Loading...' />
            {/* <p>Loading</p> */}
        </div>
    )
}

export default Loading