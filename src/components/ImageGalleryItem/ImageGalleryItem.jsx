import React, { Component } from 'react';
import PropTypes from 'prop-types'; 

import style from "./ImageGalleryItem.module.css";


export default class ImageGalleryItem extends Component {
    render() {
      return (
        <li className={style.galleryItem}>
          <img src={this.props.smallImgURL} alt={this.props.id} />
        </li>
      );
    }
  }

  ImageGalleryItem.propTypes = {
    smallImgURL: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};
