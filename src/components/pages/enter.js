import React from 'react'
import '../pages/enter-style.css';

import {
    BrowserRouter as Router,
    withRouter,
    Link
} from "react-router-dom";

import Server_api from '../services/server_api';
import Cookie_manager from '../services/cookie_manager';
import Global_variables from '../services/global_variables';


class Enter extends React.Component {
    server_api = new Server_api();
    constructor(props) {
        super(props);
        this.state = {
            loginForm: {
                Login: '',
                Password: ''
            },
            registerForm: {
                Name: '',
                Surname: '',
                Phone: '',
                Login: '',
                Password: '',
                repeatPassword: ''

            },
        }
    }

    componentWillMount() {
        if (Cookie_manager.get(Global_variables.loginCookieName) != null) {
            this.props.history.push('/')
        } else if (this.props.saveState) this.props.saveState({ isVisibleHeader: false })
    }

    _handleInputLogin = (event) => {
        this.setState({
            loginForm: {
                ...this.state.loginForm,
                [event.target.name]: event.target.value
            }
        })
    }

    _handleInputRegister = (event) => {
        this.setState({
            registerForm: {
                ...this.state.registerForm,
                [event.target.name]: event.target.value
            }
        })
    }

    _handleOnSubmitLogin = () => {
        this.server_api.loginUser(this.state.loginForm)
            .then((data) => {
                console.log(data)
                if (data.error) alert(data.error)
                else {
                    Cookie_manager.set(Global_variables.loginCookieName, data, 30);
                    if (this.props.handleOnLogin) this.props.handleOnLogin(
                        { isVisibleHeader: true }
                    )
                    // if(this.props.getUserInfo) this.props.getUserInfo()
                    // if(this.props.saveState) this.saveState({isVisibleHeader:true})
                    this.props.history.push('/')
                }
            })
            .catch((error) => {
                console.log('error fetch with loginUser ${Error}')
            })
    }

    _handleOnSubmitRegister = () => {
        let { registerForm } = this.state;
        let form = {
            Name: registerForm.Name,
            Surname: registerForm.Surname,
            Phone: registerForm.Phone,
            Login: registerForm.Login,
            Password: registerForm.Password,
        }
        this.server_api.registerUser(form)
            .then((data) => {
                console.log(data)
                if (data.error) console.log(data.error)
                else {
                    alert(data);
                }
            })
            .catch((error) => {
                console.log('error fetch with loginUser ${Error}')
            })
    }

    render() {
        let { registerForm, loginForm, repeatPassword } = this.state;
        return (
            <div className="Enter_main">
                <div className="Login_form">
                    <div className="Info">
                        ??????
                <div className="Input_blok">
                            <input name="Name" value={registerForm.Name} onChange={this._handleInputRegister} className="Input"></input>
                        </div>
                    </div>
                    <div className="Info">
                        ??????????????
                <div className="Input_blok">
                            <input name="Surname" value={registerForm.Surname} onChange={this._handleInputRegister} className="Input"></input>
                        </div>
                    </div>
                    <div className="Info">
                        ??????????????(?????????????????? 9 ????????)
                <div className="Input_blok">
                            <input name="Phone" value={registerForm.Phone} onChange={this._handleInputRegister} className="Input"></input>
                        </div>
                    </div>
                    <div className="Info">
                        ??????????
                <div className="Input_blok">
                            <input name="Login" value={registerForm.Login} onChange={this._handleInputRegister} className="Input"></input>
                        </div>
                    </div>
                    <div className="Info">
                        ????????????
                <div className="Input_blok">
                            <input name="Password" value={registerForm.Password} onChange={this._handleInputRegister} className="Input"></input>
                        </div>
                    </div><div className="Info">
                        ?????????????????????????? ????????????
                <div className="Input_blok">
                            <input name="repeatPassword" value={registerForm.repeatPassword} onChange={this._handleInputRegister} className="Input"></input>
                        </div>
                    </div>



                    <button className="Button" onClick={this._handleOnSubmitRegister}>
                        ????????????????????????????????????
                </button>

                </div>
                <div className="Enter_form">
                    <div className="Info">
                        ??????????
                <div className="Input_blok">
                            <input name="Login" value={loginForm.Login} onChange={this._handleInputLogin} className="Input"></input>
                        </div>
                    </div>
                    <div className="Info">
                        ????????????
                <div className="Input_blok">
                            <input name="Password" value={loginForm.Password} onChange={this._handleInputLogin} className="Input"></input>                </div>
                    </div>

                    <button className="Button" onClick={this._handleOnSubmitLogin} >
                        ??????????
                    </button>

                </div>

            </div>
        )
    }
}

export default withRouter(Enter);