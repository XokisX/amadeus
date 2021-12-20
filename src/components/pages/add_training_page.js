import React from 'react'
import '../pages/trainerpage-style.css';
import Server_api from '../services/server_api';
import AddTraining from './add_training';
import EditTraining from './edit_training';




class AddTrainingPage extends React.Component{

    server_api = new Server_api();
    constructor(props){
        super(props)
        this.state={
            show: false,
            trainings:null
        }
    }

    
    getTrainings =()=> {
        this.server_api.getTraining()
            .then((data) => {
                if (data.error) { alert(data.error) }
                else {
                    this.setState({
                        trainings: data
                    })
                }
            })
            .catch((error) => {
                console.log(`Error with fetch getTrainings:`, error)
            })
    }

    componentWillMount() {
        this.getTrainings()
    }

    renderListOfNews() {
        let { trainings} = this.state;
        
        if (trainings != null) {
            
            return (
                trainings.map((training, index) => {
                   
                    return (
                        <div className={'NewsItem'} onClick={this._handleOnClick.bind(this, training.Id)}>
                           
                        </div>
                    )
                })
            )
        }
        return null;
    }

    render(){
        let {userInfo} = this.props;
        return(
            <div className='Trainer_main'>
                 <div>
                    <button className='AddTraining_button' onClick={() => this.setState({show: true})}>
                        Добавить тренировку
                    </button>
                    <AddTraining userInfo={userInfo} onClose={() => this.setState({show: false})} show={this.state.show}/>
                </div>
                <div className='Training_list'>
                    
                </div>
              

            </div>
        )
    }
}

export default AddTrainingPage;