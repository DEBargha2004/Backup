import React, { useContext, useState } from 'react'
import image_icon from '../assets/image_icon.jpg'
import pdf_icon from '../assets/pdf_icon.jpg'
import video_icon from '../assets/video_icon.jpg'
import Icon from './Icon'
import propContext from '../hooks/Context'
import dots from '../assets/dots.png'
import { Menu, MenuItem, Dialog, Button } from '@mui/material'
import deleteIcon from '../assets/delete.png'
import downloadIcon from '../assets/download.png'
import txt_icon from '../assets/txt.png'
import { Download } from '../functions/handleDownload'
import { Delete } from '../functions/handleDelete'


function FileWrapper({ children, type, filename, userid, media_code, mimetype }) {

    const { setShouldRefresh } = useContext(propContext)
    const [anchorE1, setAnchorE1] = useState(null)
    const [deleteDialog, setDeleteDialog] = useState({
        value: '',
        state: false
    })
    const [serverMessage, setServerMessage] = useState({
        value: '',
        state: false
    })
    const open = Boolean(anchorE1)
    const handleClose = () => {
        setAnchorE1(null)
    }

    return (
        <>
            <div className='flex justify-center'>
                <div className='w-fit flex flex-col items-center justify-between h-[300px]'>
                    {children}
                    <div className="flex justify-between w-full items-center">
                        {type === 'image' ? <Icon src={image_icon} /> : type === 'application' ? <Icon src={pdf_icon} /> : type === 'video' ? <Icon src={video_icon} /> : type === 'text' ? <Icon src={txt_icon} /> : null}
                        <p className='w-[150px] truncate font-semibold text-slate-500'>{filename}</p>
                        <div>
                            <img src={dots} className='h-7 cursor-pointer' alt="" onClick={(e) => setAnchorE1(e.currentTarget)} />
                            <Menu
                                open={open}
                                onClose={handleClose}
                                anchorEl={anchorE1}
                            >
                                <MenuItem>
                                    <div className='flex w-[120px]' onClick={()=>Download(userid,media_code,mimetype,filename)}>
                                        <img className='h-8' src={downloadIcon} alt="" />
                                        <span className='text-slate-600'>Download</span>
                                    </div>
                                </MenuItem>
                                <MenuItem>
                                    <div className='flex w-[120px]'
                                        onClick={() => setDeleteDialog({ value: filename, state: true })}
                                    >
                                        <img className='h-6 px-1'
                                            src={deleteIcon}
                                            alt="" />
                                        <span className='text-slate-600'>Delete</span>
                                    </div>
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={deleteDialog.state} onClose={() => setDeleteDialog({ value: '', state: false })}>
                <div className='p-8 min-h-[170px] flex flex-col justify-between items-center'>
                    <p className='text-slate-400'>Are you sure want to delete <span className='text-slate-500 font-semibold'>{deleteDialog.value}</span>. This is <span className='text-slate-500 font-semibold underline underline-offset-2'>not reversible</span>. Deleted files are deleted <span className='text-slate-500 font-semibold underline underline-offset-2'>permanently</span></p>
                    <Button variant='contained' className='bg-red-500' color='error' onClick={()=>Delete(userid,media_code,mimetype,setDeleteDialog,filename,handleClose,setShouldRefresh)}>Delete</Button>
                </div>
            </Dialog>
            <Dialog open={serverMessage.state} onClose={() => setServerMessage(prev => ({ ...prev, state: false }))}>
                <p className='p-8 text-slate-500 text-lg'>{serverMessage.value === 'success' ? 'File Deleted successfully' : serverMessage.value}</p>
            </Dialog>
        </>
    )
}

export default FileWrapper;
