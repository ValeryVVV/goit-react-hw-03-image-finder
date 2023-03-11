import React, { Component } from 'react';
import PropTypes from 'prop-types'; 

import style from "./Modal.module.css";

export default class Modal extends Component {

  render() {
    return (
      <div className={style.overlay}>
        <div className={style.modal}>
          <img src={this.props.pic} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
    pic: PropTypes.string.isRequired,
};
