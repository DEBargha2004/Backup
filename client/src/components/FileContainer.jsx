import React from 'react'
import FileViewer from './FileViewer'

const FileContainer = ({ file_data }) => {
    return (
        <div className='w-full grid grid-cols-4 gap-3 ml-[5.5%] gap-y-10'>
            {
                file_data.map((item, index) => {
                    return (
                        <FileViewer
                            media_code={item.media_code}
                            filename={item.filename}
                            mimetype={item.mimetype}
                            userid={item.userid}
                            key={index}
                        />
                    )
                })
            }
        </div>
    )
}

export default FileContainer