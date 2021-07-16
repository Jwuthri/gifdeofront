import React from "react";
import Logo from "./../Logo";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import BackupIcon from '@material-ui/icons/Backup';
import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <MenuIcon className="navbar__menuIcon" />
      <Link to="/">
        <Logo />
      </Link>
      <ul className="navbar__list">
          <Link to="">
            <Button className="navbar__button" startIcon={<HomeIcon />}>
              Home
            </Button>
          </Link>
          <Link to="/search">
            <Button className="navbar__button" startIcon={<SearchIcon />}>
              Search
            </Button>
          </Link>
          <Link to="/upload">
            <Button className="navbar__button" startIcon={<BackupIcon />}>
              Upload
            </Button>
          </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
