import React from "react";
import { createBrowserHistory } from 'history';
import {connect} from 'react-redux';
import ActionType from "../../redux/GlobalActionType";

export const history = createBrowserHistory();

class Layout extends React.Component{
    constructor(props){
        super(props);
        this.checkLogin();
    }

    checkLogin(){
        if(this.props.is_login === false){
            if(localStorage.getItem('token') !== null || localStorage.getItem('token') !== undefined) {
                this.props.handleLogin();
            }
            else{
                history.push('/')
                window.location.reload();
            }
        }
    }
    render(){
        return(
            <div>
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        is_login: state.is_login
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin: () => dispatch({type : ActionType.SET_LOGIN}),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Layout);