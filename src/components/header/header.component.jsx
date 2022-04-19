import React from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";

import "./header.styles.scss";

const Header = ({ currentUser }) => {
  const pathname = useLocation().pathname;

  return (
    <div className="header">
      <Link to="/">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link
          className={`${pathname === "/shop" ? "active" : ""} option`}
          to="shop"
        >
          Shop
        </Link>
        <Link
          className={`${pathname === "/contact" ? "active" : ""} option`}
          to="contact"
        >
          Contact
        </Link>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            Sign Out
          </div>
        ) : (
          <Link
            className={`${pathname === "/signin" ? "active" : ""} option`}
            to="signin"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);
