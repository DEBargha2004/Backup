import React from 'react'

function SpecificFileContainer({ src, type }) {
    console.log(type);
    if (type === 'image') {
        return (
            <img src={src} className='' alt="" />
        )
    } else if (type === 'application') {
        return (
            <iframe src={src} className='h-[220px] w-[90%] overflow-hidden' />
        )
    } else if (type === 'video') {
        return (
            <video src={src} controls className=''></video>
        )
    } else if (type === 'text') {
        return (
            <iframe src={src} className='h-[220px] w-[90%] overflow-hidden'></iframe>
        )
    }
}

export default SpecificFileContainer;