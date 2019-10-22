import axios from 'axios';

const RootPath = 'http://localhost:5000/v1';

const getDataApi = (path) => {
    const promise = new Promise((resolve, reject) =>{
        axios.get(`${RootPath}/${path}`)
        .then((result) => {
            resolve(result);
        }, (err) => {
            reject(err);
        });           
    })
    return promise;
}

const postWithToken = (path) => {
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
    const promise = new Promise((resolve, reject) => {
        axios.get(`${RootPath}/${path}`, config)
        .then((result) => {
            resolve(result);
        }, (err) => {
            resolve(err.response);
        });        
    })
    return promise;
}

const postDataApi = (path, data) => {
    const promise = new Promise((resolve, reject) =>{
        axios.post(`${RootPath}/${path}`, data)
        .then((result) => {
            resolve(result);
        }, (err) => {
            resolve(err.response.data);
        });           
    })
    return promise;
}

const deleteDataApi = (path, id) => {
    const promise = new Promise((resolve, reject) =>{
        axios.delete(`${RootPath}/${path}/${id}`)
        .then((result) => {
              resolve(result);
        }, (err) => {
            reject(err);
        });           
    })
    return promise;
}

const editDataApi = (path, id, data) => {
    const promise = new Promise((resolve, reject) =>{
        axios.put(`${RootPath}/${path}/${id}`, data)
        .then((result) => {
              resolve(result);
        }, (err) => {
            reject(err);
        });           
    })
    return promise;
}

const API ={
    getDataApi,
    postDataApi,
    deleteDataApi,
    editDataApi,
    postWithToken,
}

export default API;
