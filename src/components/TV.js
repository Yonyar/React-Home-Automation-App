import React, { Component } from 'react';

import { firebase } from '../firebase';

import { Container } from 'react-bootstrap';
import CustomButton from './functionals/CustomButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faPlusCircle, faMinusCircle, faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

export default class TV extends Component {

    componentDidMount() {
        localStorage.setItem("index","2");
    }

    sendCodeIR = (event) => {
      if (navigator.onLine){
        const data = {
            Codigo : (event.target.id - '0')
        }
        firebase
            .database()
            .ref('Dispositivos/Room0/Television')
            .update(data);

        firebase
            .database()
            .ref('Dispositivos/Room0/Television')
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
                .ref('Dispositivos/Room0/Television')
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
                className="dark"
                id_code="21"
                sign={<FontAwesomeIcon icon={faMinusCircle}/>} sub_sign="Vol"
                handleClick={this.sendCodeIR}/>
              <CustomButton
                className="danger"
                id_code="30"
                sign={<FontAwesomeIcon icon={faPowerOff}/>} sub_sign="On/Off"
                handleClick={this.sendCodeIR}/>
              <CustomButton
                className="dark"
                id_code="20"
                sign={<FontAwesomeIcon icon={faPlusCircle}/>} sub_sign="Vol"
                handleClick={this.sendCodeIR}/>
            </Container>
            <Container>
              <CustomButton
                className="dark"
                id_code="1"
                sign="1" sub_sign="__"
                handleClick={this.sendCodeIR}/>
              <CustomButton
                className="dark"
                id_code="2"
                sign="2" sub_sign="__"
                handleClick={this.sendCodeIR}/>
              <CustomButton
                className="dark"
                id_code="3"
                sign="3" sub_sign="__"
                handleClick={this.sendCodeIR}/>
            </Container>
            <Container>
              <CustomButton
                className="dark"
                id_code="4"
                sign="4" sub_sign="__"
                handleClick={this.sendCodeIR}/>
              <CustomButton
                className="dark"
                id_code="5"
                sign="5" sub_sign="__"
                handleClick={this.sendCodeIR}/>
              <CustomButton
                className="dark"
                id_code="6"
                sign="6" sub_sign="__"
                handleClick={this.sendCodeIR}/>
            </Container>
            <Container>
              <CustomButton
                className="dark"
                id_code="7"
                sign="7" sub_sign="__"
                handleClick={this.sendCodeIR}/>
              <CustomButton
                className="dark"
                id_code="8"
                sign="8" sub_sign="__"
                handleClick={this.sendCodeIR}/>
              <CustomButton
                className="dark"
                id_code="9"
                sign="9" sub_sign="__"
                handleClick={this.sendCodeIR}/>
            </Container>
            <Container>
              <CustomButton
                className="dark"
                id_code="23"
                sign={<FontAwesomeIcon icon={faChevronCircleLeft}/>} sub_sign="Prog"
                handleClick={this.sendCodeIR}/>
              <CustomButton
                className="dark"
                id_code="10"
                sign="0" sub_sign="__"
                handleClick={this.sendCodeIR}/>
              <CustomButton
                className="dark"
                id_code="22"
                sign={<FontAwesomeIcon icon={faChevronCircleRight}/>} sub_sign="Prog"
                handleClick={this.sendCodeIR}/>
            </Container>
          </Container>
      );
    }
}
