import React, { Component } from 'react';

import { firebase } from '../firebase';

import { Container, Spinner } from 'react-bootstrap';

import Room from './functionals/Room';
import AddRoom from './functionals/AddRoom';

export default class Control extends Component {
    constructor(props) {
        super(props)
        this.state = {
          Room0: {
            Enable: true,
            Led: {
              Estado: false
            },
            Luz: {
              Estado: false,
              Rele: false,
              Brillo: 0,
              LDR: false,
              Motion: false
            },
          },
          Room1: {
            Enable: true,
            Led: {
              Estado: false
            },
            Luz: {
              Estado: false,
              Rele: false,
              Brillo: 0,
              LDR: false,
              Motion: false
            }
          },
          render: true,
          UltimaActualizacion: 0}

    }
    componentDidMount() {
        firebase.database().ref('Dispositivos/')
        .on('value', snapshot => {
            this.goUpdate(snapshot,2)
        });
        localStorage.setItem("index","0");
    }

    forceRender = () => {
      this.setState({render : !this.state.render})
    }

    handleShow = e => {
      let room = "Show";
      if (e.target.tagName === 'DIV') room += e.target.title;
      else if (e.target.tagName === 'P') room += e.target.parentElement.title

      const show = localStorage.getItem(room)==="true"?true:false;
      localStorage.setItem(room, !show);
      e.stopPropagation();
      this.forceRender();
    }

    goUpdate = (snapshot, n_rooms) => {
        const UltimaActualizacion = snapshot.child("UltimaActualizacion").val();
        if ( this.state.UltimaActualizacion !== UltimaActualizacion){
          for (let i=0; i<n_rooms; i++){
            const room = "Room" + String(i);
            const luz = snapshot.child([room]).child("Luz").val();
            this.setState(prevState => ({
              UltimaActualizacion: UltimaActualizacion,
              [room]: {
                ...prevState[room],
                  Luz: luz
              }}))
          }
        }
    }

    handleUpdate = (Zona, Elemento, Dato, Valor) => {
      const time = {
        UltimaActualizacion : Date.now(),
      }

      let data = {};

      switch(Dato) {
        case "Rele":
          data = {Rele : Valor}
          break;
        case "Brillo":
          data = {Brillo : Valor}
          break;
        case "LDR":
          data = {LDR : Valor}
          break;
        case "Motion":
          data = {Motion : Valor}
          break;
        default:
          data = {Estado : Valor}
      }

      // -- Update data
      firebase
        .database()
        .ref('Dispositivos/' + Zona + '/' + Elemento)
        .update(data);

      // -- Update time
      firebase
        .database()
        .ref('Dispositivos/')
        .update(time);
    }

    UpdateCheck = (event) => {
      if (navigator.onLine){
        let Valor;
        if (event.target.title === "Brillo"){
            Valor = parseInt(event.target.value);
        } else {
            Valor = event.target.checked;
        }
        this.handleUpdate(event.target.placeholder, event.target.name, event.target.title, Valor);
      }
    }

    render() {
        return (
          <>
             {(this.state.UltimaActualizacion)===0?
               <Container className="d-flex justify-content-center mt-5">
                 <Spinner
                  animation="grow"
                  variant="secundary"
                  style={{width: '10rem', height: '10rem'}}
                  />
                </Container>
              :
              <>
                 <Room roomName="Room0"
                   title={localStorage.getItem("NameRoom0")===null?"Habitación 1":localStorage.getItem("NameRoom0")}
                   Enable={localStorage.getItem("EnableRoom0")==="true"?true:false}
                   Show={localStorage.getItem("ShowRoom0")==="true"?true:false}
                   UpdateCheck={this.UpdateCheck}
                   handleShow={this.handleShow}
                   handleChange={this.handleChange}
                   room={this.state.Room0}
                   render={this.forceRender}
                 />
                 <Room roomName="Room1"
                   title={localStorage.getItem("NameRoom1")===null?"Habitación 2":localStorage.getItem("NameRoom1")}
                   Enable={localStorage.getItem("EnableRoom1")==="true"?true:false}
                   Show={localStorage.getItem("ShowRoom1")==="true"?true:false}
                   UpdateCheck={this.UpdateCheck}
                   handleShow={this.handleShow}
                   handleChange={this.handleChange}
                   room={this.state.Room1}
                   render={this.forceRender}
                 />
                 <AddRoom
                  render={this.forceRender}
                 />
              </>
            }
          </>
        );
    }
}
