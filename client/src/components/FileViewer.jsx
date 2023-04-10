import React from 'react'
import FileWrapper from './FileWrapper'
import values from '../assets/value'
const { file_style } = values

function FileViewer({ media_code, userid, mimetype, filename }) {

  const type = mimetype.split('/')[0]
  const src = `http://localhost:5000/media?userid=${userid}&location=${media_code}&mimetype=${mimetype}`



  if (type === 'image') {
    return (
      <FileWrapper
        filename={filename}
        type={type}
        mimetype={mimetype}
        userid={userid}
        media_code={media_code}
      >
        <div className={file_style}>
          <img src={src} className='' alt="" />
        </div>
      </FileWrapper>
    )
  } else if (type === 'application') {
    return (
      <FileWrapper
        filename={filename}
        type={type}
        mimetype={mimetype}
        userid={userid}
        media_code={media_code}
      >
        <div className={file_style}>
          <iframe src={src} className='h-[220px] w-[250px] overflow-hidden' />
        </div>
      </FileWrapper>
    )
  } else if (type === 'video') {
    return (
      <FileWrapper
        filename={filename}
        type={type}
        mimetype={mimetype}
        userid={userid}
        media_code={media_code}
      >
        <div className={file_style}>
          <video src={src} controls className=''></video>
        </div>
      </FileWrapper>
    )
  }
}

export default FileViewer;