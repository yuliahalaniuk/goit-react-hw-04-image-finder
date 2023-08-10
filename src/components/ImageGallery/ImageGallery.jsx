import React, { useState } from 'react';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';

const ImageGallery = ({ foundResults }) => {
  const [modalOpen, setModalToggle] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  const onImgClick = largeImageURL => {
    setLargeImageURL(largeImageURL);
    setModalToggle(prevState => !prevState);
  };

  return (
    <>
      <ul className={css.imgList}>
        {foundResults.map(({ id, webformatURL, tags, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            onImgClick={onImgClick}
            webformatURL={webformatURL}
            tags={tags}
            largeImageURL={largeImageURL}
          />
        ))}
      </ul>

      {modalOpen && (
        <Modal
          imgUrl={largeImageURL}
          onClose={() => {
            setModalToggle(prevState => !prevState);
          }}
        />
      )}
    </>
  );
};

ImageGallery.propTypes = {
  foundResults: PropTypes.array.isRequired,
};

export default ImageGallery;
