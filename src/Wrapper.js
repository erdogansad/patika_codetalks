import React from 'react';
import Router from './Router';
import FlashMessage from 'react-native-flash-message';

const Wrapper = () => {
  return (
    <>
      <Router />
      <FlashMessage position="top" />
    </>
  );
};

export default Wrapper;
