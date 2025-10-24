import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { Container, ListGroup, Button } from 'react-bootstrap';

const AddRoom = (props) => {
  let [show, setShow] = React.useState(false);

  function addRoom(e) {
    const room = "Enable"+e.target.id;
    localStorage.setItem(room, true);
    setShow(false);
    props.render();
  }

  return (
    <>
      <Container className="mt-4 mb-2 text-center">
       <Button variant="dark" onClick={e => setShow(!show)}>
         <FontAwesomeIcon icon={faPlus} size="2x"/>
       </Button>
      </Container>

      <Container className="text-center px-5" style={{display:show?"block":"none"}}>
       <ListGroup.Item disabled className="bg-dark text-white p-1">
         Selecciona habitación
       </ListGroup.Item>
       <ListGroup.Item action id="Room0" onClick={e => addRoom(e)}
        style={{display:localStorage.getItem("EnableRoom0")==="true"?"none":"block"}}>
         {localStorage.getItem("NameRoom0")===null?"Habitación 1":localStorage.getItem("NameRoom0")}
       </ListGroup.Item>
       <ListGroup.Item action id="Room1" onClick={e => addRoom(e)}
        style={{display:localStorage.getItem("EnableRoom1")==="true"?"none":"block"}}>
         {localStorage.getItem("NameRoom1")===null?"Habitación 2":localStorage.getItem("NameRoom1")}
       </ListGroup.Item>
       <ListGroup.Item action id="noRooms" className="mb-4"
        style={{display:localStorage.getItem("EnableRoom0")==="true"
                &&localStorage.getItem("EnableRoom1")==="true"?
                "block":"none"}}>
         Ninguna habitación disponible
       </ListGroup.Item>
      </Container>
    </>
  )
}

export default AddRoom;
