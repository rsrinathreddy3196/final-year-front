import axios from 'axios'

const Backend = axios.create({
    baseURL:'http://localhost:3000',
    headers:{
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "localhost:300",
    }
})

export default Backend