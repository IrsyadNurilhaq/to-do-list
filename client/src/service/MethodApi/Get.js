import {RootPath} from "./Config";
import axios from 'axios';

const Get = (path) => {
    let config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json',
            'Accept': 'application/json'
        }
      }
    const promise = new Promise((resolve, reject) =>{
        axios.get(`${RootPath}/${path}`,config)
        .then((result) => {
            resolve(result);
        }, (err) => {
            reject(err);
        });           
    })
    return promise;
}

export default Get;