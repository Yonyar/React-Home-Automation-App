import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faEye} from '@fortawesome/free-solid-svg-icons';

import Switch from './Switch';

import '../../styles/light.css';
import { ProgressBar, Badge } from 'react-bootstrap';

const Light = (props) => {
    return (
      <>
        <Switch className_input="ios-toggle absoltePos" className_label="checkbox-label absoltePos"
          title="Estado"
          Estado={props.Estado}>
        </Switch>
        <Switch className_input="ios-toggle ReleCtrl" className_label="checkbox-label ReleCtrl"
          id_label={props.id_label}
          id_room={props.id_room}
          id_element="Luz"
          title="Rele"
          Estado={props.Rele}
          handleClick={props.handleChange}>
        </Switch>
        <div className="sliderContainer pl-2">
          <Badge className="percent mx-1" pill variant={props.Estado?"primary":"secondary"} style={{left:"calc("+props.Brillo+" * -0.5px + "+props.Brillo+"%)"}}>{props.Brillo}%</Badge>
          {props.Estado?
            <ProgressBar className="barPos" animated now={props.Brillo}/>
            :<ProgressBar className="barPos" variant="secondary" now={props.Brillo}/>}
          <input className="slider" type="range" min="0" max="100" value={props.Brillo} id={props.id_label}
            placeholder={props.id_room} name="Luz" title="Brillo"
            onChange={props.handleChange}/>
          <label className="option_ldr mr-2 mb-0">
            <input className="ldrInput" readOnly type='checkbox' id={props.id_label}
              placeholder={props.id_room} name="Luz" title="LDR"
              checked={props.LDR}
              onClick={props.handleChange}/>
            <span className="text-center"><FontAwesomeIcon icon={faSun} size="2x"/></span>
            <p className="text-option text-center">Ldr</p>
          </label>
          <label className="option_motion mr-2 mb-0">
            <input className="motionInput" readOnly type="checkbox" id={props.id_label}
              placeholder={props.id_room} name="Luz" title="Motion"
              checked={props.Motion}
              onClick={props.handleChange}/>
            <span className="text-center"><FontAwesomeIcon icon={faEye} size="2x"/></span>
            <p className="text-option text-center">Motion</p>
          </label>
        </div>
      </>
    );
};

  export default Light;
