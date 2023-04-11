export const Delete = async (userid, media_code, mimetype, setDeleteDialog, filename, handleClose,setShouldRefresh) => {
    let response = await fetch(`http://localhost:5000/deleteMedia?userid=${userid}&location=${media_code}&mimetype=${mimetype}`, {
        method: 'GET',
        credentials: 'include'
    })

    response = await response.json()
    if (response.server_message.status === 'success') {
        setDeleteDialog({ state: false, value: filename })
        setServerMessage({
            value: response.server_message.status,
            state: true
        })
        handleClose()
        setTimeout(() => {
            setServerMessage(prev => ({
                ...prev,
                state: false
            }))
            setShouldRefresh(true)
        }, 1500)

    } else {
        setServerMessage({
            value: response.server_message.status
        })
    }
}