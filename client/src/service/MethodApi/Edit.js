import {RootPath} from "./Config";
import axios from 'axios';

const Edit = (path,id,data) => {
    let config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json',
            'Accept': 'application/json'
        }
      }
    const promise = new Promise((resolve, reject) =>{
        axios.put(`${RootPath}/${path}/${id}`,data,config)
        .then((result) => {
            resolve(result);
        }, (err) => {
            reject(err);
        });           
    })
    return promise;
}

export default Edit;