import React, { Component } from 'react';

import { firebase } from '../firebase';

import { Container } from 'react-bootstrap';
import CustomButton from './functionals/CustomButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faFan } from '@fortawesome/free-solid-svg-icons';

export default class Fan extends Component {

    componentDidMount() {
        localStorage.setItem("index","3");
    }

    sendCodeIR = (event) => {
      if (navigator.onLine){
        const data = {
            Codigo : (event.target.id - '0')
        }
        firebase
            .database()
            .ref('Dispositivos/Room0/Ventilador')
            .update(data);

        firebase
            .database()
            .ref('Dispositivos/Room0/Ventilador')
            .update({Peticion : true});

        const target = event.currentTarget;
        const eventStyle = target.style;
        const eventClass = target.classList;

        eventStyle.pointerEvents = "none";
        eventStyle.borderColor = "yellow";
        eventClass.add("disabled");

        setTimeout(function(){
            firebase
                .database()
                .ref('Dispositivos/Room0/Ventilador')
                .update({Peticion : false, Codigo: 0 });
            eventStyle.pointerEvents = "";
            eventStyle.borderColor = "white";
            eventClass.remove("disabled");
        }, 500);
      }
    };


    render() {
      return (
          <Container className="text-center mt-4">
            <Container>
              <CustomButton
                className="primary"
                id_code="1"
                sign={<FontAwesomeIcon icon={faSun}/>} sub_sign="On/Off"
                handleClick={e => this.sendCodeIR(e)}/>
            </Container>
            <Container>
              <CustomButton
                className="danger"
                id_code="2"
                sign={<FontAwesomeIcon icon={faFan}/>} sub_sign="OFF"
                handleClick={e => this.sendCodeIR(e)}/>
              <CustomButton
                className="dark"
                id_code="3"
                sign={<FontAwesomeIcon icon={faFan}/>}  sub_sign="LOW"
                handleClick={e => this.sendCodeIR(e)}/>
              <CustomButton
                className="dark"
                id_code="4"
                sign={<FontAwesomeIcon icon={faFan}/>}  sub_sign="MED"
                handleClick={e => this.sendCodeIR(e)}/>
              <CustomButton
                className="dark"
                id_code="5"
                sign={<FontAwesomeIcon icon={faFan}/>}  sub_sign="HI"
                handleClick={e => this.sendCodeIR(e)}/>
            </Container>
          </Container>
      );
    }
}
