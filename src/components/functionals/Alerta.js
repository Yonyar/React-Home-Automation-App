import React from 'react';
import { LinkContainer } from "react-router-bootstrap";

import { Alert, Button } from 'react-bootstrap';

const Alerta = (props) => {
  return (
      <div id="alerta">
        <Alert show={props.show} variant="warning" className="text-center m-2 m-3">
          <Alert.Heading>{props.title}</Alert.Heading>
            {props.text}
          <hr />
          <div>
            <Button onClick={props.handleClose} variant="outline-dark">
              {props.btnCancel}
            </Button>
            <LinkContainer to={props.link}>
              <Button onClick={props.alertFunction} variant="outline-danger" className="ml-5" id={props.id}>
                {props.btnAccept}
              </Button>
            </LinkContainer>
          </div>
        </Alert>
      </div>
  );
}

export default Alerta;
