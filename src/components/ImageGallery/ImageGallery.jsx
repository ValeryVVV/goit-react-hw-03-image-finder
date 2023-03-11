import Modal from 'components/Modal/Modal';
import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types'; 
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';


import style from './ImageGallery.module.css';


export default class ImageGallery extends Component {
    state = {
      showModal: false,
      bigPic: null,
    };
  
    componentDidMount() {
      document.addEventListener('click', e => {
        if (e.target.nodeName !== 'IMG') {
          this.setState({ showModal: false });
          return;
        } else {
          let picture = this.props.images;
          this.setState({ bigPic: picture[0].largeImageURL });
        }
      });
    }
  
    toggleModal = () => {
      this.setState(({ showModal }) => ({ showModal: !showModal }));
    };
  
    render() {
      const { showModal, bigPic } = this.state;
      return (
        <>
          <ul className={style.gallery} onClick={this.toggleModal}>
            {this.props.images.map(img => {
              return (
                <ImageGalleryItem
                  key={nanoid()}
                  smallImgURL={img.webformatURL}
                  id={img.id}
                />
              );
            })}
          </ul>
          {showModal && bigPic && (
            <Modal onClose={this.toggleModal} pic={bigPic} />
          )}
        </>
      );
    }
  }

  ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,

        })
    )
};
