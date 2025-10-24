import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';

import '../../styles/delRoom.css';

const DelRoom = (props) => {

  return (
    <Container className="listItemComponent text-center">
      <FontAwesomeIcon icon={faTrash}/>
    </Container>
  )
}

export default DelRoom;
