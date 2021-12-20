import React from 'react'
import '../pages/add_training-style.css';
import { useState, useEffect } from 'react';
import Server_api from '../services/server_api';


const AddTraining = props => {
    const server_api = new Server_api();
    const [disable, setDisable] = useState(false);
    const [scheduleDate, setScheduleDate] = useState(false);
    const [startTime, setStartTime] = useState(false);
    const [endTime, setEndTime] = useState(false);
    const [trainers,setTrainers] = useState(null);

    const getAllTrainers = () =>{
        server_api.getTrainers()
        .then((data)=>{
            setTrainers(data);
        })
        .catch((error)=>{
            console.log(`Error with fetch getAllTrainers`,error)
        })
    }

    useEffect(()=>{
        getAllTrainers();
    },[])

    if(!props.show){
        return null
    }
    
    

    const _handleTimeChange = (event) =>{
        let date = new Date();
        let currentDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        let date1= new Date(event.target.value);
        let date2= new Date(currentDate);
        if(date2>date1){
            alert("Нельзя выбрать прошлую дату")
            setDisable(false)
            setScheduleDate(currentDate)
        }else{
            setDisable(true)
            setScheduleDate(event.target.value)
        }
    }

    const renderSelect = () =>{
        if(props.userInfo!=null&&props.userInfo.role==2){
            return(
                <select name="select"> {/* Здесь нужны список пользователей */}
                    <option value="value1">Значение 1</option>
                    <option value="value2" selected>Значение 2</option>
                    <option value="value3">Значение 3</option>
                </select>
            )
        }else return null;
    }

 

  

    return(

        <div className='AddTraining_main' onClick={props.onClose}>
            <div className='AddTraining_content' onClick={e => e.stopPropagation()}>
                <p className='Close_button' onClick={props.onClose}>Закрыть</p>
                {renderSelect()}
                <div className='Date'>
                    <input value={scheduleDate} type="date" name="Calendar" onChange={_handleTimeChange}></input>
                </div>
                <select name="trainer" id="trainer">
                {/*                         надо сделать список тренеров тут(имя фамилия) */}
                    {trainers!=null?(
                        trainers.map((trainer,index)=>{
                            return(
                                <option value={trainer.Id}>{trainer.Surname}</option>
                            )
                        })
                    ):(null)}
                </select>
                <button className='TrainingSearch'>
                    Поиск
                </button>
                <div className='TrainingList'>

                </div>
                <button className='AddTraining'>
                    Добавить
                </button>
                


            </div>

        </div>
    )


}

export default AddTraining;