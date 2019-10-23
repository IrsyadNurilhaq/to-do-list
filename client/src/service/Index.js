import Post from "./MethodApi/Post";
import Get from "./MethodApi/Get";
import Edit from "./MethodApi/Edit";
import Delete from "./MethodApi/Delete";

//Post
const postLogin = (data) => Post('user/login',data,false);
const postData = (data) => Post('list',data,true)

//Get
const getList = () => Get('list');

//Edit
const editList = (id,data) => Edit('list',id,data)

//Delete
const deleteList = (id) => Delete('list',id);

const API ={
    postLogin,
    postData,
    getList,
    editList,
    deleteList
}

export default API;
