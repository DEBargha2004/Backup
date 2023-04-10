import React, { useContext } from 'react'
import values from '../assets/value'
import image_icon from '../assets/image_icon.jpg'
import pdf_icon from '../assets/pdf_icon.jpg'
import video_icon from '../assets/video_icon.jpg'
import Icon from './Icon'
import propContext from '../hooks/Context'

const { download: download_icon } = values

function FileWrapper({ children, type, filename, userid, media_code, mimetype }) {

    const { setShouldRefresh } = useContext(propContext)

    const Download = async () => {
        const url = `http://localhost:5000/downloadMedia?userid=${userid}&location=${media_code}&mimetype=${mimetype}`
        let response = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        })
        const blob = await response.blob()
        console.log(blob);
        const temp_url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.download = filename
        link.href = temp_url
        document.body.appendChild(link)
        link.click()
    }
    const Delete = async () => {
        let response = await fetch(`http://localhost:5000/deleteMedia?userid=${userid}&location=${media_code}&mimetype=${mimetype}`, {
            method: 'GET',
            credentials: 'include'
        })

        response = await response.json()
        if (response.server_message.status === 'success') {
            alert('File Deleted')
            setShouldRefresh(true)
        } else {
            alert(response.server_message.status)
        }
    }

    return (
        <div className='flex justify-center'>
            <div className='w-fit flex flex-col items-center justify-between h-[300px]'>
                {children}
                <div className="flex justify-between w-full items-center">
                    {type === 'image' ? <Icon src={image_icon} /> : type === 'application' ? <Icon src={pdf_icon} /> : type === 'video' ? <Icon src={video_icon} /> : null}
                    <p className='w-[150px] truncate font-semibold text-slate-500'>{filename}</p>
                    {<img src={download_icon} alt='download-button' className='cursor-pointer' onClick={() => Download()} />}
                    <button className='border-red-700 border-[1px] rounded-md' onClick={() => Delete()}>DEL</button>
                </div>
            </div>
        </div>
    )
}

export default FileWrapper;