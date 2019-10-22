import React from "react";
import { createBrowserHistory } from 'history';
import Service from "../service/Index";

export const history = createBrowserHistory();

class Layout extends React.Component{
    constructor(props){
        super(props);
        if(localStorage.getItem('token') !== null || localStorage.getItem('token') !== undefined) {
            this.getProfile();
        }
    }

    getProfile(){
        Service.postWithToken("/list").then((res) => {
            if(res.data.status === 401) {
                localStorage.removeItem('token');
                history.push('/login')
            }
        }) 
    }
    render(){
        return(
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default Layout;