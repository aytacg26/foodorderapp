import React from 'react';

const Backdrop = ({ onClick, className }) => {
  return <div className={className} onClick={onClick}></div>;
};

export default Backdrop;
