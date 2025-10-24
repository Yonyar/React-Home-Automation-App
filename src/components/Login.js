import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { firebase, loginFirebase } from '../firebase';

import '../styles/login.css';
import { Container, Card, Form, Button, Spinner, Badge } from 'react-bootstrap';

class Login extends Component {

  constructor(props) {
    super(props);
    this.user = {
      email: '',
      nickname: '',
      password: ''
    }
    this.state = {
      error:'',
      loading: false
    }
  }

  handleNameChange = event => {
    this.user.email = event.target.value;
  }

  handlePasswordChange = event => {
    this.user.password = event.target.value;
  }

  showSpin = () => {
    this.setState({ loading: true ,error: '' });
  }
  quitSpin = () => {
    this.setState({ loading: false });
  }

  handleSubmit = event => {
    event.preventDefault();

    if (this.user.email !== '' && this.user.password !== '') {
      this.showSpin();
      loginFirebase(firebase, this.user).then(result => {
      if (result === true) {
        this.props.history.push('/control');
      } else {
          this.quitSpin();
          this.setState({ error: result });
        }
      });
    } else this.setState({ error: '¡Faltan datos!' });
  }

  handleLoading = () => {
    if (this.state.loading) return (
      <Spinner animation="border" variant="primary"/>
    );
    else return (
      <Button id="btnSubmit" type="submit">Entrar</Button>
    );
  }

  isLoaded = () => {
    this.setState({ imageLoad: true });
  }

  render() {
    return (
      <>
          <Container className="backimg">
            <Card id="formLogin" className="backcard m-0 centered text-white text-center">
              <Form onSubmit={this.handleSubmit}>
                <Card.Header className="cardHeader">
                  <Card.Title>Acceso</Card.Title>
                  <Form.Text id="error">
                    <Badge className="text-danger mb-2" variant="light">{this.state.error}</Badge>
                  </Form.Text>
                </Card.Header>
                <Card.Body className="w-100 cardBody">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control type="text"
                      onChange={this.handleNameChange}
                      value={this.state.email}
                      placeholder="Email"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password"
                      onChange={this.handlePasswordChange}
                      value={this.state.password}
                      placeholder="Contraseña"
                    />
                  </Form.Group>
                </Card.Body>
                <Card.Footer className="cardFooter">
                  {this.handleLoading()}
                </Card.Footer>
              </Form>
            </Card>
          </Container>
      </>
    );
  }
}

export default withRouter(Login);
