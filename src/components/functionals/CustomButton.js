import React from 'react';

import { Button } from 'react-bootstrap';
import "../../styles/tv.css";

const CustomButton = (props) => {
    return (
        <Button variant={props.className} id={props.id_code} onClick={props.handleClick} className="btn-circle m-3 p-0 ">
          {props.sign}
          <p id={props.id_code} className="font-italic low-text">{props.sub_sign}</p>
        </Button>
    );
  };

  export default CustomButton;
