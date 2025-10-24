import React, { Component } from 'react';

import { Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi } from '@fortawesome/free-solid-svg-icons';

class Disconected extends Component {

  state = {
    isDisconnected: false
  }

  componentDidMount() {
    window.addEventListener('online', this.handleConnectionChange);
    window.addEventListener('offline', this.handleConnectionChange);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleConnectionChange);
    window.removeEventListener('offline', this.handleConnectionChange);
  }

  handleConnectionChange = () => {
      const condition = navigator.onLine ? 'online' : 'offline';
      if (condition === 'online') {
        const webPing = setInterval(
          () => {
            fetch('//google.com', {
              mode: 'no-cors',
              })
            .then(() => {
              this.setState({ isDisconnected: false }, () => {
                return clearInterval(webPing)
              });
            }).catch(() => this.setState({ isDisconnected: true }) )
          }, 1000);
        return;
      }

      return this.setState({ isDisconnected: true });
    }

    render() {
      const { isDisconnected } = this.state;
      return (
        <>
          {isDisconnected
            ?<Alert variant='danger' className="text-center w-100 p-0 m-0" style={{height:"25px", zIndex:1000}}><FontAwesomeIcon icon={faWifi}/> No hay conexión</Alert>
            :<></>}
        </>
      );
    }
  }

  export default Disconected;
