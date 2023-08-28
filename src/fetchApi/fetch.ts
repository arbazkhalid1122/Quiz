import axios from "axios";


export async function getApi() {
    try {
        const get = axios.get('http://localhost:3000/api/database/hello')
       const res = await get
       return res.data
    } catch (error) {
        console.log(error);
    }
}

export async function postApi() {
    try {
        const get = axios.post('http://localhost:3000/api/database/hello')
       const res = await get;
       return res.data
    } catch (error) {
        console.log(error);
    }
}
