export const Download = async (userid,media_code,mimetype,filename) => {
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
    document.body.removeChild(link)
}