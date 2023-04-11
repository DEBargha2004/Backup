import React from 'react'
import FileWrapper from './FileWrapper'
import values from '../assets/value'
import SpecificFileContainer from './SpecificFileContainer'
const { file_style } = values

function FileViewer({ media_code, userid, mimetype, filename }) {

  const type = mimetype.split('/')[0]
  const src = `http://localhost:5000/media?userid=${userid}&location=${media_code}&mimetype=${mimetype}`




  return (
    <FileWrapper
      filename={filename}
      type={type}
      mimetype={mimetype}
      userid={userid}
      media_code={media_code}
      include
    >
      <div className={file_style}>
        <SpecificFileContainer src={src} type={type} />
      </div>
    </FileWrapper>
  )

}

export default FileViewer;