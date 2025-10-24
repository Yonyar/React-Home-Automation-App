import React from 'react';
import { Link } from "react-router-dom";
import { useSwipeable, Swipeable } from 'react-swipeable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faFan, faCog, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { Nav } from 'react-bootstrap';

const Selector = (props) => {

  return (
    <Swipeable onSwipedLeft={() => props.SwipeLeft()} onSwipedRight={() => props.SwipeRight()}>
      <Link to={props.path} style={{width:"120px", height:"65px"}}>
        <FontAwesomeIcon icon={props.icon}/> {props.text}
      </Link>
    </Swipeable>
  );
};

export default Selector;
