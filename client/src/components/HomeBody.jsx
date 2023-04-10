import React, { useEffect, useState, useContext } from 'react'
import DialogBox from './Dialog';
import { Button } from '@mui/material';
import propContext from '../hooks/Context';
import FileContainer from './FileContainer';
import { handleUploadMedia } from '../functions/handleUploadMedia'
import InputButton from './InputButton';
import values from '../assets/value'

const { types } = values

function HomeBody() {
  const [file, setFile] = useState(null)
  const [fileUploadDialog, setFileUploadDialog] = useState({
    status: false
  })
  const [selected, setSelected] = useState({
    id: 0,
    symbol: [
      "image",
      "video",
      "application"
  ]
  })

  const { AppData, setShouldRefresh } = useContext(propContext)
  const { file_data } = AppData
  console.log(AppData, 'this is AppData');

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
      <InputButton setFile={setFile} />
      <div className='w-full flex justify-center mb-[50px] mx-[20%]'>
        {
          types.map((item, index) => (
            <div
              className={`w-[8%] pb-4 mx-7 text-center text-lg font-semibold cursor-pointer ${item.id === selected.id ? 'border-b-4 border-blue-500 text-blue-500' : 'text-slate-500'}`}
              key={index}
              onClick={() => setSelected({
                id: index,
                symbol: item.symbol
              })}
            >
              {
                item.type
              }
            </div>
          ))
        }
      </div>
      {
        file_data.length ?
          <FileContainer file_data={file_data} selected={selected} /> :
          <p className='text-2xl font-semibold text-slate-500'>You have no files to backup</p>
      }
      <DialogBox Open={fileUploadDialog.status} setOpen={setFileUploadDialog}>
        {file && file.name}
        {file && file.size}
        {file && <Button variant='contained' className='bg-blue-400 text-white' onClick={() => handleUploadMedia(setFileUploadDialog, setFile, file, setShouldRefresh)}>Upload</Button>}
      </DialogBox>
    </div>
  )
}

export default HomeBody;