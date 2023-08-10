import React, { useEffect, useRef, useState } from 'react';

import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import Warning from '../Warning/Warning';

import css from './App.module.css';
import { fetchImages } from '../../api/api.js';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED_FAILED: 'rejected_failed',
  REJECTED_NOT_FOUND: 'rejected_not_found',
  RESOLVED: 'resolved',
};

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foundResults, setFoundResults] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = useState(STATUS.IDLE);

  const total = useRef(0);

  const handleSearchSubmit = query => {
    setSearchQuery(query);
    setPage(1);
  };

  const onLoadMoreBtnClick = e => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    const getIm = async neededQuery => {
      try {
        setLoading(true);
        fetchImages(page, neededQuery).then(({ hits, totalHits }) => {
          total.current = totalHits;

          if (hits.length === 0) {
            setStatus(STATUS.REJECTED_NOT_FOUND);
            return;
          }

          setFoundResults(prevResults =>
            prevResults ? [...prevResults, ...hits] : hits
          );
          setStatus(STATUS.RESOLVED);
        });
      } catch (error) {
        setStatus(STATUS.REJECTED_FAILED);
      } finally {
        setLoading(false);
      }
    };

    setStatus(STATUS.PENDING);
    setFoundResults([]);

    getIm(searchQuery);
  }, [searchQuery, page]);

  // useEffect(() => {
  //   getImages(searchQuery);
  // }, [getImages, page, searchQuery]);

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.searchQuery !== this.state.searchQuery) {
  //     this.setState({ status: STATUS.PENDING, foundResults: [] });
  //     this.getImages(this.state.searchQuery);
  //   } else if (prevState.page !== this.state.page) {
  //     this.getImages(this.state.searchQuery);
  //   }
  // }

  const shouldRenderLoadMoreButton = foundResults.length < total.current;

  return (
    <>
      <Searchbar onSubmit={handleSearchSubmit} />
      <div className={css.ImageListContainer}>
        {status === STATUS.IDLE && (
          <Warning message="Please enter you request" />
        )}

        {status === STATUS.PENDING && <Loader />}

        {status === STATUS.REJECTED_FAILED && (
          <Warning message="Opps... Something went wrong" />
        )}

        {status === STATUS.REJECTED_NOT_FOUND && (
          <Warning
            message={`Sorry, nothing found for ${searchQuery}. Please try again`}
          />
        )}

        {status === STATUS.RESOLVED && (
          <>
            <ImageGallery foundResults={foundResults} />

            {isLoading ? (
              <Loader />
            ) : shouldRenderLoadMoreButton ? (
              <Button handleLoadMore={onLoadMoreBtnClick} />
            ) : (
              <Warning message=" You've reached the end of the results" />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default App;
