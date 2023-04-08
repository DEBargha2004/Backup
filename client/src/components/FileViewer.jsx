import React from 'react'

function FileViewer({media_code,userid,mimetype,filename}) {
  const type = mimetype.split('/')[0]
  if(type === 'image'){
    return (
        <a href={`http://localhost:5000/media?userid=${userid}&location=${media_code}&mimetype=${mimetype}`} download>
            <img src={`http://localhost:5000/media?userid=${userid}&location=${media_code}&mimetype=${mimetype}`} className='h-[250px] w-[250px] object-cover' alt="" />
        </a>
    )
  }else if(type === 'application'){
    return (
      <a href={`http://localhost:5000/media?userid=${userid}&location=${media_code}&mimetype=${mimetype}`} download>
         <embed src={`http://localhost:5000/media?userid=${userid}&location=${media_code}&mimetype=${mimetype}`} className='h-[250px] w-[250px] object-cover' type="" />
      </a>
    )
  }
}

export default FileViewer;