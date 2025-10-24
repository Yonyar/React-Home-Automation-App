import React from 'react';
import { LinkContainer } from "react-router-bootstrap";

import { firebase, outFirebase } from '../../firebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faFan, faCog, faWarehouse, faExclamation } from '@fortawesome/free-solid-svg-icons';

import '../../styles/header.css';
import { Row, Col, Navbar, Nav, NavDropdown, Badge, Form } from 'react-bootstrap';
import Alerta from './Alerta';

const Header = (props) => {
  let [show, setShow] = React.useState(false);
  let [logged, setLogged] = React.useState(false);
  let [render, setRender] = React.useState(false);

  function activate(e){
    localStorage.setItem(e.target.id,e.target.checked);
    setRender(!render);
    props.change();
  };

  function handleClose(){
    setShow(false);
  };
  function alertFunction(){
    outFirebase(firebase);
    setShow(false);
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

    return (
      <div style={{display:logged?"block":"none"}}>
        <Navbar className="rounded m-1 p-1 justify-content-between" collapseOnSelect bg="dark" variant='dark'>
          <Navbar.Brand>
            <h3>
            <Badge variant="secondary">iHome</Badge>
            </h3>
          </Navbar.Brand>
            <Nav fill variant="pills">
              <Row className="header-menu">
                <Col className="mx-3"
                style={{display: (localStorage.getItem("showControl")!=="true" && localStorage.getItem("showTV")!=="true" && localStorage.getItem("showFan")!=="true" && localStorage.getItem("showGarage")!=="true")?'block':'none'}}>
                  <Nav.Item className="text-light">
                    <p className="infoCong"><FontAwesomeIcon icon={faExclamation}/> No hay controles activos</p>
                  </Nav.Item>
                </Col>
                <Col className="justify-content-center" style={{display: localStorage.getItem("showControl")==="true"?'flex':'none'}}>
                  <LinkContainer to="/control" style={{width:"65px", height:"65px"}}>
                    <Nav.Link className="m-0">
                      <Nav.Item>
                        <FontAwesomeIcon icon={faCog}/><p>Control</p>
                      </Nav.Item>
                    </Nav.Link>
                  </LinkContainer>
                </Col>
                <Col className="justify-content-center" style={{display: localStorage.getItem("showGarage")==="true"?'flex':'none'}}>
                  <LinkContainer to="/garage_remote" style={{width:"65px", height:"65px"}}>
                    <Nav.Link className="m-0">
                      <Nav.Item>
                        <FontAwesomeIcon icon={faWarehouse}/><p>Garaje</p>
                      </Nav.Item>
                    </Nav.Link>
                  </LinkContainer>
                </Col>
                <Col className="justify-content-center" style={{display: localStorage.getItem("showTV")==="true"?'flex':'none'}}>
                  <LinkContainer to="/tv_remote" style={{width:"65px", height:"65px"}}>
                    <Nav.Link className="m-0">
                      <Nav.Item>
                        <FontAwesomeIcon icon={faTv}/><p>TV</p>
                      </Nav.Item>
                    </Nav.Link>
                  </LinkContainer>
                </Col>
                <Col className="justify-content-center" style={{display: localStorage.getItem("showFan")==="true"?'flex':'none'}}>
                  <LinkContainer to="/fan_remote" style={{width:"65px", height:"65px"}}>
                    <Nav.Link className="m-0">
                      <Nav.Item>
                        <FontAwesomeIcon icon={faFan}/><p>Fan</p>
                      </Nav.Item>
                    </Nav.Link>
                  </LinkContainer>
                </Col>
                <Col className="pl-1 py-1 no-userselect">
                  <NavDropdown alignRight title={<img width="36px" alt="iHome_logo" src="/assets/Logo_iHome.png"/>}>
                    <NavDropdown className="activate-menu dropleft" alignRight title="Activar">
                      <Form className="m-2 confDropdown">
                        <Form.Check isValid
                          custom
                          type="checkbox"
                          label="Control Habitaciones"
                          id="showControl"
                          onClick={(e) => activate(e)}
                          defaultChecked={localStorage.getItem("showControl")==="true"?true:false}
                        />
                        <NavDropdown.Divider/>
                        <Form.Check isValid
                          custom
                          type="checkbox"
                          label="Control Garaje"
                          id="showGarage"
                          onClick={(e) => activate(e)}
                          defaultChecked={localStorage.getItem("showGarage")==="true"?true:false}
                        />
                        <NavDropdown.Divider/>
                        <Form.Check isValid
                          custom
                          type="checkbox"
                          label="Control TV "
                          id="showTV"
                          onClick={(e) => activate(e)}
                          defaultChecked={localStorage.getItem("showTV")==="true"?true:false}
                        />
                        <NavDropdown.Divider/>
                        <Form.Check isValid
                          custom
                          type="checkbox"
                          label="Control Ventilador"
                          id="showFan"
                          onClick={(e) => activate(e)}
                          defaultChecked={localStorage.getItem("showFan")==="true"?true:false}
                        />
                      </Form>
                    </NavDropdown>
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
