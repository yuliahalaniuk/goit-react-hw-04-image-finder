import React, { useState } from 'react';
import css from './ImageGalleryItems.module.css';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';

const ImageGalleryItem = ({ item }) => {
  const { webformatURL, tags, largeImageURL } = item;

  const [modalOpen, setModalToggle] = useState(false);
  const [activeURL, setactiveURL] = useState('');

  const onImgClick = url => {
    setactiveURL(url);
    setModalToggle(prevState => !prevState);
  };

  return (
    <>
      <li
        className={css.imgListItem}
        onClick={() => {
          onImgClick(largeImageURL);
        }}
      >
        <img src={webformatURL} className={css.imgListPic} alt={tags} />
      </li>

      {modalOpen && (
        <Modal
          imgUrl={activeURL}
          onClose={() => {
            setModalToggle(prevState => !prevState);
            setactiveURL('');
          }}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;
