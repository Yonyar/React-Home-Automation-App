import React, { Component } from 'react';
import { Link } from "react-router-dom";

import '../styles/home.css';
import '../styles/glow-on-hover.css';

import { Container, Button} from 'react-bootstrap';

class Home extends Component {

    render() {
        return (
          <Container className="home">
          <div className="load">
            <hr/><hr/><hr/><hr/>
          </div>

          <Container id="home" className="fluid-container text-center">
              <Link to="/login">
                <Button className="glow-on-hover" id="btnLogin" size="lg">Identifícate</Button>
              </Link>
          </Container>
          </Container>
        );
    }
}

export default Home;
