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
            <div className='p-10'>
                {children}
            </div>
        </Dialog>
    )
}

export default DialogBox;