export default async function logChecker(setLoggedin,setAppData){
    console.log('logchecker activated');
    let response = await fetch('http://localhost:4000/logChecker',{
        method:'GET',
        headers:{
            'Content-Type' : 'application/json'
        },
        credentials : 'include'
    })
    response = await response.json()
    if(response.server_message.status === 'success'){
        setLoggedin(true)
        console.log(response.server_message.data);
        setAppData(response.server_message.data)
    }else{
        setLoggedin(false)
    }
};
