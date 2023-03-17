import React, { Component } from 'react';
import PropTypes from 'prop-types'; 

import style from "./Modal.module.css";

export default class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
      }
    
      componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
      }
    
      handleKeyDown = e => {
        if (e.code === 'Escape') {
          return this.props.onClose();
        }
      };

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
