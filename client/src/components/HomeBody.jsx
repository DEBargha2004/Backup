import React, { useEffect, useState, useContext, useRef } from 'react'
import DialogBox from './Dialog';
import { Button } from '@mui/material';
import propContext from '../hooks/Context';
import FileContainer from './FileContainer';
import { handleUploadMedia } from '../functions/handleUploadMedia'
import InputButton from './InputButton';
import values from '../assets/value'
import SpecificFileContainer from './SpecificFileContainer';

const { types, file_style } = values
console.log(types[0]);

function HomeBody() {
  const [file, setFile] = useState(null)
  const InputRef = useRef(null)
  const [url, setUrl] = useState({
    type: '',
    src: ''
  })
  const [fileUploadDialog, setFileUploadDialog] = useState({
    status: false
  })
  const [serverMessage, setServerMessage] = useState({
    status: false,
    value: ''
  })
  const [selected, setSelected] = useState({
    id: 0,
    symbol: [
      "image",
      "video",
      "application",
      "text"
    ]
  })

  const { AppData, setShouldRefresh } = useContext(propContext)
  const { file_data } = AppData

  useEffect(() => {
    if (file) {
      const temporary_url = window.URL.createObjectURL(new Blob([file], { type: file.type }))
      setUrl({
        src: temporary_url,
        type: file.type.split('/')[0]
      })
      setFileUploadDialog({ status: true })
    }
    return () => window.URL.revokeObjectURL(url)
  }, [file])
  useEffect(() => {
    if (fileUploadDialog.status === false) {
      InputRef.current.value = null
      setFile(null)
      setUrl({
        src: '',
        type: ''
      })
    }
  }, [fileUploadDialog])

  return (
    <div className='w-full h-[200px] flex justify-between items-center flex-col'>
      <InputButton setFile={setFile} InputRef={InputRef} />
      <div className='w-full flex justify-center mb-[50px] mx-[20%]'>
        {
          types.map((item, index) => {
            console.log(item.symbol)
            return (
              <div
                className={`w-[8%] pb-4 mx-7 text-center text-[90%] font-semibold cursor-pointer truncate ${item.id === selected.id ? 'border-b-4 border-blue-500 text-blue-500' : 'text-slate-500'}`}
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
            )
          })
        }
      </div>
      {
        file_data.length ?
          <FileContainer file_data={file_data} selected={selected} /> :
          <p className='text-2xl font-semibold text-slate-500'>You have no files to backup</p>
      }
      <DialogBox Open={fileUploadDialog.status} setOpen={setFileUploadDialog}>
        <div className='flex flex-col items-center justify-between h-[350px]'>
          <div className={`${file_style}`}>
            <SpecificFileContainer src={url.src} type={url.type} />
          </div>
          <div className='flex w-[80%] justify-center text-slate-400'>
            <span className='truncate'>{file && file.name}</span>
          </div>
          {file && <Button variant='contained' className='bg-blue-400 text-white' onClick={() => handleUploadMedia(setFileUploadDialog, setFile, file, setShouldRefresh, setServerMessage)}>Upload</Button>}
        </div>
      </DialogBox>
      <DialogBox Open={serverMessage.status} setOpen={setServerMessage}>
        <p className='text-lg text-slate-400 p-8'>{serverMessage.value}</p>
      </DialogBox>
    </div>
  )
}

export default HomeBody;