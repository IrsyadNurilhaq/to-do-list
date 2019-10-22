import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import '../../style/main.css';
import '../../style/util.css';
import Service from "../../service/Index";


class Login extends Component{
    constructor(props) 
    {
        super(props);
        this.state = {
            validate : null
        }
    }
    onSubmit = (e) =>{
        let data = {
            "email"   : e.target.email.value,
            "password": e.target.password.value
        }
        Service.postDataApi('user/login',data).then((res) => {
            if(res.data){
                if(res.data.status === 200) {
                    localStorage.setItem('token', res.data.token)
                    this.props.history.push('/dashboard')
                }
            } else this.setState({validate: "Wrong email / password"})
        })
    }
    render(){
        return(
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <form className="login100-form validate-form" onSubmit={e => { e.preventDefault(); this.onSubmit(e) }}>
                            <span className="login100-form-title p-b-43">
                                Login to list your activity
                            </span>
                            
                            
                            <div className="wrap-input100 validate-input">
                                <input className="input100" type="text" name="email" placeholder={"Email"} />
                                <span className="focus-input100"></span>
                            </div>
                            
                            
                            <div className="wrap-input100 validate-input">
                                <input className="input100" type="password" name="password" placeholder={"Password"}/>
                                <span className="focus-input100"></span>
                            </div>

                            <div className="flex-sb-m w-full p-t-3 p-b-32">
                                <p>{this.state.validate}</p>
                            </div>
                    

                            <div className="container-login100-form-btn">
                                <button type="submit" className="login100-form-btn">
                                    Login
                                </button>
                            </div>
                            
                            <div className="text-center p-t-46 p-b-20">
                                <span className="txt2">
                                    <Link to="/register">Sign Up</Link>
                                    
                                </span>
                            </div>
                        </form>

                        <div className="login100-more">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;