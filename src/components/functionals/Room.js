import React from 'react';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import Light from './Light';
import Alerta from './Alerta';
import DelRoom from './DelRoom';
import { Container, Card, Form, Button } from 'react-bootstrap';

const Room = (props) => {
  const [triggeredItemAction, triggerItemAction] = React.useState('None');

  let [show, setShow] = React.useState(false);
  let [edit, setEdit] = React.useState(false);

  const swipeLeftOptions = () => ({
    content: (
      <></>
    ),
    action: () => triggerItemAction(deleteFunction(props.roomName))
  });

  function deleteFunction(e){
    const room = "Enable"+e;
    localStorage.setItem(room, false);
    setShow(false);
    setEdit(false);
    props.render();
  };
  const threshold = 0.75;

  function handleClose(){
    setShow(false);
  };
  function handleEdit(e){
    setEdit(!edit);
    setShow(false);
    e.stopPropagation();
  };
  function alertFunction(e){
    const room = "Enable"+e.target.id;
    localStorage.setItem(room, false);
    setShow(false);
    setEdit(false);
  };

  function handleNameChange(){
    const roomName = document.getElementById("Name"+props.roomName).value;
    const room = "Name"+props.roomName;
    localStorage.setItem(room, roomName);
    setEdit(false);
  };

    return (
      <SwipeableList threshold={threshold} style={{display: props.Enable?'block':'none'}}>
        <SwipeableListItem
          swipeLeft={swipeLeftOptions()}>
          <Card style={{display: props.Enable?'block':'none'}} className="border-dark m-2">
           <Card.Header onClick={props.handleShow} title={props.roomName} className="rounded-0 text-center bg-dark text-white p-2">
             <Card.Text onClick={props.handleShow} className="d-inline">
               {props.title}
             </Card.Text>
             <Card.Text onClick={e => handleEdit(e)} className="float-right px-3">
               <FontAwesomeIcon icon={faEdit}/>
             </Card.Text>
           </Card.Header>
           <Card.Body style={{display:edit?"block":"none"}} className="border-dark text-center">
            <Container style={{display:show?"none":"inline-block"}}>
              <Form onSubmit={e => handleNameChange()}>
                <Form.Group>
                  <Form.Control type="text" required className="text-center"
                    id={"Name"+props.roomName}
                    placeholder="Nombre de habitación"
                  />
                </Form.Group>
                <Button type="submit" variant="primary">Cambiar</Button>
                <Button variant="danger" className="text-center ml-2"
                  onClick={() => setShow(true)}
                  style={{display:show?"none":"inline-block"}}
                  >
                  <FontAwesomeIcon icon={faTrash}/> Borrar
                </Button>
              </Form>
            </Container>
            <div>
              <Alerta show={show} handleClose={e => handleClose()}
                id={props.roomName}
                link='/control'
                alertFunction={e => alertFunction(e)}
                title='Desactivar Habitación'
                text='¿Seguro que quieres eliminar esta habitación?'
                btnCancel='No'
                btnAccept='Sí, Bórrala'
              />
            </div>
           </Card.Body>
           <Card.Body className={props.Show?"show pb-0 pr-0 mr-0 border-dark":"notShow"}>
             <Light
               id_label={props.roomName}
               id_room={props.roomName}
               handleChange={props.UpdateCheck}
               Estado={props.room.Luz.Estado}
               Rele={props.room.Luz.Rele}
               Brillo={props.room.Luz.Brillo}
               LDR={props.room.Luz.LDR}
               Motion={props.room.Luz.Motion}
               dataon="Luz on" dataoff="Luz off"/>
           </Card.Body>
          </Card>
        </SwipeableListItem>
      </SwipeableList>
    );
}
export default Room;
