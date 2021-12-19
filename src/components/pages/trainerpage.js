import React from 'react'
import '../pages/trainerpage-style.css';
import Server_api from '../services/server_api';
import Modal from '../pages/call';


class TrainerPage extends React.Component{


    server_api = new Server_api();
    constructor(props){
        super(props)
        this.state={
            show: false,

        }
    }

    componentDidMount(){
       
    }

    



    render(){

        return(
            <div>

            </div>
        )

    }
    
}

export default TrainerPage;