export const handleUploadMedia = async (setFileUploadDialog,setFile,file,setShouldRefresh) => {
  const formData = new FormData()
  formData.append('user_media', file)
  if (file) {
    let response = await fetch('http://localhost:5000/saveMedia', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    })
    response = await response.json()
    setFileUploadDialog({ status: false })
    setFile(null)
    if (response.server_message.status === 'success') {
      alert('image uploaded')
      setShouldRefresh(true)
    } else {
      alert(response.server_message.status)
    }
  }
}