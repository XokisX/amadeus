import React from 'react'
import '../pages/adminpage-style.css';
import AddSchedule from '../pages/add_schedule';

class Admin extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            show:false
        }
    }
    

    render(){
        return(
            <div className="Admin_main">
                <nav className='Links'>
                <a className='Nav_link' href="/admin_trainers">Тренера</a>
                <a className='Nav_link' href="/admin_users">Пользователи</a>
                <a className='Nav_link' href="/admin_calls">Звонки</a>
                <a className='Nav_link' href="/admin_news">Новости</a>
                <button className='EditUsers_button' onClick={() => this.setState({show: true})}>
                            Добавить расписание
                </button>
                </nav>
               
                <AddSchedule onClose={() => this.setState({show: false})} show={this.state.show}/>

                <div className='Trainings'>

                </div>
                



            </div>
        )
    }              
}

export default Admin;