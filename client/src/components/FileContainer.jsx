import React from 'react'
import FileViewer from './FileViewer'

const FileContainer = ({ file_data, selected }) => {
    return (
        <div className='w-full grid grid-cols-4 gap-3 gap-y-10'>
            {
                file_data.map((item, index) => {
                    const type = item.mimetype.split('/')[0]
                    if (selected.symbol.includes(type)) {
                        return (
                            <FileViewer
                                media_code={item.media_code}
                                filename={item.filename}
                                mimetype={item.mimetype}
                                userid={item.userid}
                                key={index}
                            />
                        )
                    }
                })
            }
        </div>
    )
}

export default FileContainer