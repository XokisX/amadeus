import React from 'react';
import { Link,withRouter } from 'react-router-dom';
import '../header/header-style.css'
import CookiesManager from '../services/cookie_manager';


class Header extends React.Component {

    _handleLogOut =()=>{
        CookiesManager.clearAll();
        if(this.props.handleOnLogOut)this.props.handleOnLogOut({userInfo:null,isVisibleHeader:false})
        this.props.history.push('/enter');
    }

    render() {
        let { userInfo } = this.props;
        const logo = require('../images/logo.png');

        if (userInfo != null) {

            const  renderNav  = () => {
                if (userInfo.role === 1) {
                    return (
                        <>
                            <Link className="Nav_link" to="/">Главная</Link>
                            <Link className="Nav_link" to="/trainers">Тренера</Link>
                            <Link className="Nav_link" to="/photos">Фотоальбом</Link>
                            <Link className="Nav_link" to="/prices">Цены</Link>
                        </>
                    )
                } else if (userInfo.role === 3) {
                    return (
                        <>
                            <Link className="Nav_link" to="/admin">Главная</Link>
                            <Link className="Nav_link" to="/admin_trainers">Управление тренерами</Link>
                            <Link className="Nav_link" to="/admin_users">Управление пользователями</Link>
                            <Link className="Nav_link" to="/admin_calls">Управление звонками</Link>
                        </>
                    )
                }else return null;
                return null;
            }

            return (
                <div className="Up_string">
                    <div className="Logo">
                        <img className="Logo_img" src={logo} alt={"logo"} />
                        <p className="Logo_text">КСК"АМАДЕУС ФАВОРИТ"</p>
                    </div>
                    <nav className="Nav">
                        {/* <Link className="Nav_link" to="/">Главная</Link>
                        <Link className="Nav_link" to="/trainers">Тренера</Link>
                        <Link className="Nav_link" to="/photos">Фотоальбом</Link>
                        <Link className="Nav_link" to="/prices">Цены</Link> */}

                        {renderNav()}
                    </nav>

                    <button onClick={this._handleLogOut}>Выйти</button>
                    {/* <div className="Enter">
                        <Link className="Enter_text" to="/enter" >Вход/Регистрация</Link>
    
                    </div> */}




                </div>

            )
        }
        return null;
    }
}

export default withRouter(Header)