import React from 'react'
import { Box } from '@mui/material'

function FormWrapper1({ children }) {
    return (
        <Box className='h-full flex justify-center items-center'>
            <Box className='w-[60%] mt-10 flex justify-center flex-col items-center'>
                {children}
            </Box>
        </Box>
    )
}

export default FormWrapper1