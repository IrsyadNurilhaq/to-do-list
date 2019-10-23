import {RootPath} from "./Config";
import axios from 'axios';

const POST = (path, data, header) => {
    let config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json',
            'Accept': 'application/json'
        }
    }
    const promise = new Promise((resolve, reject) =>{
        axios.post(`${RootPath}/${path}`, data, header === true ? config : null)
        .then((result) => {
            resolve(result);
        }, (err) => {
            resolve(err.response);
        });           
    })
    return promise;
}

export default POST;