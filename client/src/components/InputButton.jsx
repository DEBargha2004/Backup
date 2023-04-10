import React from 'react'
import { Add } from '@mui/icons-material';

function InputButton({ setFile }) {
    return (
        <label htmlFor="fileIcon" className='mb-16'>
            <div className='p-5 bg-blue-300 rounded-[50%] flex justify-center items-center hover:scale-110 transition'>
                <Add className='scale-95 text-white' fontSize='large' />
            </div>
            <input
                type="file"
                className='h-0 w-0 absolute opacity-0'
                id='fileIcon'
                onChange={(e) => setFile(e.target.files[0])}
            />
        </label>
    )
}

export default InputButton