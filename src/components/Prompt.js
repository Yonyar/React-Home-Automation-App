import React, { Component } from 'react';

import { Toast, Button } from 'react-bootstrap';

class Prompt extends Component {

  componentDidMount() {
    const cardInstall = document.getElementById("CardInstall");
    // Detects if device is on iOS
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test( userAgent );
    }
    // Detects if device is in standalone mode
    const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

    // Checks if should display install popup notification:
    if (isIos() && !isInStandaloneMode()) {
      cardInstall.style.display = 'none';
    }

    this.installBanner();
  }

  installBanner = () => {
    window.addEventListener('beforeinstallprompt', (e) => {
      this.deferredPrompt = e;
      this.showInstallPromotion();
    });
  }

  showInstallPromotion = () => {
    const btnInstall = document.getElementById("btnInstall");
    const cardInstall = document.getElementById("CardInstall");

    btnInstall.addEventListener('click', (e) => {
      // hide our user interface that shows our A2HS button
      cardInstall.style.display = 'none';
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice
        .then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          this.deferredPrompt = null;
        });
    });
  }

  render() {
    return (
        <Toast id="CardInstall" className="no-userselect"
          style={{
            position: 'absolute',
            right: '0',
          }}
          onClose={() => document.getElementById("CardInstall").style.display = 'none'}>
          <Toast.Header>
            <img width="24px" src="/assets/Logo_iHome.png" className="rounded mr-3" alt="" />
            <strong className="mr-auto"> Instalar la App! </strong>
          </Toast.Header>
          <Toast.Body className="text-center">
            <Button id="btnInstall" variant="primary">Instalar</Button>
          </Toast.Body>
        </Toast>
    );
  }
}
export default Prompt;
