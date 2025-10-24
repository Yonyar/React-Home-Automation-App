import React from 'react';
import { Container} from 'react-bootstrap';
const Empty = () => {
  return (
    <Container className="text-center my-5">
      <img width="100px" src="./assets/exclamation.png" alt="empty"/>
      <h3>Control Desactivado</h3>
    </Container>
  );
};

export default Empty;
