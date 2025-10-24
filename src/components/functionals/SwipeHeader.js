import React from 'react';
import { LinkContainer } from "react-router-bootstrap";

import { Swipeable } from 'react-swipeable'

import { firebase, outFirebase } from '../../firebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faFan, faCog, faWarehouse, faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

import '../../styles/header.css';
import { Row, Col, Navbar, Nav, NavDropdown, Badge } from 'react-bootstrap';
import Alerta from './Alerta';

const Header = (props) => {
  let [show, setShow] = React.useState(false);
  let [logged, setLogged] = React.useState(false);
  let [render, setRender] = React.useState(false);

  let index = parseInt(localStorage.getItem("index"));
  const maxItems = 4;

  function handleClose(){
    setShow(false);
  };
  function alertFunction(){
    outFirebase(firebase);
    setShow(false);
  };

  function handleSwipeLeft(){
    if(index===maxItems-1) index=0;
    else index++;
    swipe(index);
    setRender(!render);
  };
  function handleSwipeRight(){
    if (index===0) index=maxItems-1;
    else index--;
    swipe(index);
    setRender(!render);
  };

  firebase.auth().onAuthStateChanged(user => {
      user? setLogged(true):setLogged(false);
  });

  document.body.addEventListener("click", e => {
    if(e.target !== document.getElementById("alerta")
      && e.target.parentElement !== document.getElementById("alerta")
      && e.target.parentElement.parentElement !== document.getElementById("alerta")) {
      handleClose();
    }
  });

function swipe(index) {
    let id;
    switch(index) {
      case 0:
        id = 'control';
        break;
      case 1:
        id = 'garage';
        break;
      case 2:
        id = 'tv';
        break;
      case 3:
        id = 'fan';
        break;
      default:
        break;
    }

    document.getElementById(id).click();
  }

    return (
      <div style={{display:logged?"block":"none"}}>
        <Navbar className="rounded m-1 p-1 justify-content-between" collapseOnSelect bg="dark" variant='dark'>
          <Navbar.Brand>
            <h3>
            <Badge variant="secondary">iHome</Badge>
            </h3>
          </Navbar.Brand>
            <Nav fill variant="pills">
              <Row>
                <Swipeable onSwipedLeft={() => handleSwipeLeft()} onSwipedRight={() => handleSwipeRight()}>
                  <Col className="justify-content-center"
                  style={{display: localStorage.getItem("index")==="0"?'flex':'none'}}>
                    <FontAwesomeIcon className="mt-2 pr-1 control-activo" icon={faAngleDoubleLeft}/>
                    <LinkContainer id="control" to="/control" style={{width:"140px", height:"30px"}}>
                      <Nav.Link>
                        <Nav.Item>
                          Control
                          <p>
                            <FontAwesomeIcon icon={faCog} className="mx-1 control-activo"/>
                            <FontAwesomeIcon icon={faWarehouse} className="mx-1 control-noActivo"/>
                            <FontAwesomeIcon icon={faTv} className="mx-1 control-noActivo"/>
                            <FontAwesomeIcon icon={faFan} className="mx-1 control-noActivo"/>
                          </p>
                        </Nav.Item>
                      </Nav.Link>
                    </LinkContainer>
                    <FontAwesomeIcon className="pl-1 mt-2 control-activo" icon={faAngleDoubleRight}/>
                  </Col>
                  <Col className="justify-content-center"
                  style={{display: localStorage.getItem("index")==="1"?'flex':'none'}}>
                    <FontAwesomeIcon className="mt-2 pr-1 control-activo" icon={faAngleDoubleLeft}/>
                    <LinkContainer id="garage" to="/garage_remote" style={{width:"140px", height:"30px"}}>
                      <Nav.Link>
                        <Nav.Item>
                          Garaje
                          <p>
                            <FontAwesomeIcon icon={faCog} className="mx-1 control-noActivo"/>
                            <FontAwesomeIcon icon={faWarehouse} className="mx-1 control-activo"/>
                            <FontAwesomeIcon icon={faTv} className="mx-1 control-noActivo"/>
                            <FontAwesomeIcon icon={faFan} className="mx-1 control-noActivo"/>
                          </p>
                        </Nav.Item>
                      </Nav.Link>
                    </LinkContainer>
                    <FontAwesomeIcon className="pl-1 mt-2 control-activo" icon={faAngleDoubleRight}/>
                  </Col>
                  <Col className="justify-content-center"
                  style={{display: localStorage.getItem("index")==="2"?'flex':'none'}}>
                    <FontAwesomeIcon className="mt-2 pr-1 control-activo" icon={faAngleDoubleLeft}/>
                    <LinkContainer id="tv" to="/tv_remote" style={{width:"140px", height:"30px"}}>
                      <Nav.Link>
                        <Nav.Item>
                          TV
                          <p>
                            <FontAwesomeIcon icon={faCog} className="mx-1 control-noActivo"/>
                            <FontAwesomeIcon icon={faWarehouse} className="mx-1 control-noActivo"/>
                            <FontAwesomeIcon icon={faTv} className="mx-1 control-activo"/>
                            <FontAwesomeIcon icon={faFan} className="mx-1 control-noActivo"/>
                          </p>
                        </Nav.Item>
                      </Nav.Link>
                    </LinkContainer>
                    <FontAwesomeIcon className="pl-1 mt-2 control-activo" icon={faAngleDoubleRight}/>
                  </Col>
                  <Col className="justify-content-center"
                  style={{display: localStorage.getItem("index")==="3"?'flex':'none'}}>
                    <FontAwesomeIcon className="mt-2 pr-1 control-activo" icon={faAngleDoubleLeft}/>
                    <LinkContainer id="fan" to="/fan_remote" style={{width:"140px", height:"30px"}}>
                      <Nav.Link>
                        <Nav.Item>
                          Fan
                          <p>
                            <FontAwesomeIcon icon={faCog} className="mx-1 control-noActivo"/>
                            <FontAwesomeIcon icon={faWarehouse} className="mx-1 control-noActivo"/>
                            <FontAwesomeIcon icon={faTv} className="mx-1 control-noActivo"/>
                            <FontAwesomeIcon icon={faFan} className="mx-1 control-activo"/>
                          </p>
                        </Nav.Item>
                      </Nav.Link>
                    </LinkContainer>
                    <FontAwesomeIcon className="pl-1 mt-2 control-activo" icon={faAngleDoubleRight}/>
                  </Col>
                </Swipeable>
                <Col className="pl-0 no-userselect">
                  <NavDropdown alignRight title={<img width="36px" alt="iHome_logo" src="/assets/Logo_iHome.png"/>}>
                    <NavDropdown.Item className="bg_exit" onClick={() => setShow(true)}>Salir</NavDropdown.Item>
                  </NavDropdown>
                </Col>
              </Row>
            </Nav>
        </Navbar>

        <Alerta show={show} handleClose={handleClose}
          link= '/home'
          alertFunction={alertFunction}
          title='Cerrar Sesión'
          text='Vas a cerrar sesión.¡Se volverán a pedir credenciales cuando vuelvas!'
          btnCancel='Cancelar'
          btnAccept='Aceptar'
          />
      </div>
    );
};

export default Header;
