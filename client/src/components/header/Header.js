import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';

const Header = () => {
  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo"><Link to="/">Courses</Link></h1>
        <Nav />
      </div>
    </div>
  );
};

export default Header;
