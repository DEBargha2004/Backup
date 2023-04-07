import React from 'react'
import { Dialog } from '@mui/material'

function DialogBox({ children, Open, setOpen }) {
    const handleClose = () => {
        setOpen({
            status: !Open
        })
    }
    return (
        <Dialog onClose={handleClose} open={Open}>
            <p className='p-10'>
                {children}
            </p>
        </Dialog>
    )
}

export default DialogBox;