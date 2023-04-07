export const handleLogout = async (setLoggedin, setAppData) => {
    let response = await fetch('http://localhost:4000/logout',{
        method:'POST',
        credentials:'include'
    })
    response = await response.json()
    if(response.server_message.status === 'success'){
        console.log('success message received');
        setLoggedin(false)
        setAppData({})
    }
}