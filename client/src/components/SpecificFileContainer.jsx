import React from 'react'

function SpecificFileContainer({ src, type }) {
    console.log(type);
    if (type === 'image') {
        return (
            <img src={src} className='' alt="" />
        )
    } else if (type === 'application') {
        return (
            <embed src={src} className='h-[220px] w-[250px] overflow-hidden' />
        )
    } else if (type === 'video') {
        return (
            <video src={src} controls className=''></video>
        )
    } else if (type === 'text') {
        return (
            <embed src={src} className='h-[220px] w-[250px] overflow-hidden'></embed>
        )
    }
}

export default SpecificFileContainer;