import React from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalEl = document.querySelector('#modal');

const Modal = ({ imgUrl, onClose }) => {
  const hadleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  // const handleKeyDown = e => {
  //   if (e.code === 'Escape') {
  //     onClose();
  //   }
  // };

  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown);
  //   document.body.style.overflow = 'hidden';
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  //   document.body.style.overflow = 'auto';
  // }

  return createPortal(
    <div className={css.modalBackdrop} onClick={hadleBackdropClick}>
      <div className={css.modalBlock}>
        <img src={imgUrl} alt="modal" className={css.modalImg} />
      </div>
    </div>,
    modalEl
  );
};

Modal.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
