import React from 'react';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ foundResults }) => {
  return (
    <ul className={css.imgList}>
      {foundResults.map(item => (
        <ImageGalleryItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  foundResults: PropTypes.array.isRequired,
};

export default ImageGallery;
