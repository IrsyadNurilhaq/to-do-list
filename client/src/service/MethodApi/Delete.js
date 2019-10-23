import {RootPath} from "./Config";
import axios from 'axios';

const Delete = (path,id) => {
    let config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json',
            'Accept': 'application/json'
        }
      }
    const promise = new Promise((resolve, reject) =>{
        axios.delete(`${RootPath}/${path}/${id}`,config)
        .then((result) => {
            resolve(result);
        }, (err) => {
            reject(err);
        });           
    })
    return promise;
}

export default Delete;