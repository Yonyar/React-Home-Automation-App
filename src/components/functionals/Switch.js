import React from 'react';

import '../../styles/switch.css';

const Switch = (props) => {
    return (
      <>
        <input readOnly className={props.className_input} type="checkbox" id={props.id_label}
          placeholder={props.id_room} name={props.id_element} title={props.title}
          checked={props.Estado}
          onClick={props.handleClick} />
        <label htmlFor={props.id_label} className={props.className_label} data-on={props.dataon}></label>
      </>
    );
  };

  export default Switch;
