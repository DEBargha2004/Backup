import React, { useEffect, useState, useContext } from 'react'
import { Add } from '@mui/icons-material';
import DialogBox from './Dialog';
import { Button } from '@mui/material';
import propContext from '../hooks/Context';
import FileContainer from './FileContainer';
import { handleUploadMedia } from '../functions/handleUploadMedia'

function HomeBody() {
  const [file, setFile] = useState(null)
  const [fileUploadDialog, setFileUploadDialog] = useState({
    status: false
  })

  const { AppData, setShouldRefresh } = useContext(propContext)
  const { file_data } = AppData
  console.log(AppData,'this is AppData');

  useEffect(() => {
    if (file) {
      setFileUploadDialog({ status: true })
    }
  }, [file])
  useEffect(() => {
    if (fileUploadDialog.status === false) {
      setFile(null)
    }
  }, [fileUploadDialog])

  return (
    <div className='w-full h-[200px] flex justify-between items-center flex-col'>
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
      {file_data.length ? <FileContainer file_data={file_data} /> : <p className='text-2xl font-semibold text-slate-500'>You have no files to backup</p> }
      <DialogBox Open={fileUploadDialog.status} setOpen={setFileUploadDialog}>
        {file && file.name}
        {file && file.size}
        {file && <Button variant='contained' className='bg-blue-400 text-white' onClick={() => handleUploadMedia(setFileUploadDialog, setFile, file,setShouldRefresh)}>Upload</Button>}
      </DialogBox>
    </div>
  )
}

export default HomeBody;