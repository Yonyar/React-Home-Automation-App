import React, { Component } from 'react';

import { firebase } from '../firebase';

import { Container } from 'react-bootstrap';
import CustomButton from './functionals/CustomButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen, faDoorClosed } from '@fortawesome/free-solid-svg-icons';

export default class Garage extends Component {

    componentDidMount() {
        localStorage.setItem("index","1");
    }

    switchDoor = (event) => {
        firebase
            .database()
            .ref('Dispositivos/Garage0')
            .update({Switch : true});

        const target = event.currentTarget;
        const eventStyle = target.style;
        const eventClass = target.classList;

        eventStyle.pointerEvents = "none";
        eventStyle.borderColor = "yellow";
        eventClass.add("disabled");

        setTimeout(function(){
            firebase
                .database()
                .ref('Dispositivos/Garage0')
                .update({Switch : false});
            eventStyle.pointerEvents = "";
            eventStyle.borderColor = "white";
            eventClass.remove("disabled");
        }, 2000);
      }

    render() {
      return (
          <Container className="text-center mt-4">
            <Container>
              <CustomButton
                className="primary"
                id_code="1"
                sign={<FontAwesomeIcon icon={faDoorOpen}/>} sub_sign="Open/Close"
                handleClick={e => this.switchDoor(e)}/>
            </Container>
          </Container>
      );
    }
}
