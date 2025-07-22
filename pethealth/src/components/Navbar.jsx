import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../style/Navbar.css";
import Logo from "../assets/react.svg";
import { getAuth } from "firebase/auth";
// import { getFirestore, doc, getDoc, onSnapshot, collection, query, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/config";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
 // const [unreadCount, setUnreadCount] = useState(0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navStyle" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <ul className="split1">
        <li>
          <Link to="/">
            <img className="logo" src={Logo} alt="Logo" />
          </Link>
        </li>
      </ul>
      <nav className="navbar">
        <ul style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Log out</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
