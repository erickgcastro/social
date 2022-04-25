import React, { useState, memo, useEffect } from "react";
import { Link } from "react-router-dom";

import { AiOutlineHome } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosRocket } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import UserNav from "./UserNav";
import DropdownMenu from "./DropdownMenu";
import SideMenu from "./SideMenu";

import "./nav.css";

const Navbar = () => {
  const [sideMenu, setSideMenu] = useState(false);
  const [dropMenu, setDropMenu] = useState(false);
  const [shadow, setShadow] = useState(false);

  const addShadow = () => {
    if (window.scrollY > 10) {
      setShadow(true);
    } else {
      setShadow(false);
    }
  };

  useEffect(() => {
    if (sideMenu) {
      document.body.classList.add("modal-delete-post");
    } else {
      document.body.classList.remove("modal-delete-post");
    }
  }, [sideMenu]);

  useEffect(() => {
    window.addEventListener("scroll", addShadow);
    return () => {
      window.removeEventListener("scroll", addShadow);
    };
  }, []);

  return (
    <header>
      {sideMenu && <SideMenu setSideMenu={setSideMenu} />}
      <nav
        className="navbar"
        style={{ boxShadow: shadow ? "0px 0px 15px black" : undefined }}
      >
        <GiHamburgerMenu
          className={sideMenu ? "hamburger h-open" : "hamburger"}
          onClick={() => setSideMenu(true)}
        />

        <p className="title">Logo</p>

        <ul>
          <li>
            <Link to="/" className="btn-nav">
              <AiOutlineHome />
            </Link>
          </li>
          <li>
            <Link to="/users" className="btn-nav">
              <FiSearch />
            </Link>
          </li>
          <li>
            <Link to="/all" className="btn-nav">
              <IoIosRocket />
            </Link>
          </li>
        </ul>

        <UserNav props={{ setDropMenu }} />
        {dropMenu && <DropdownMenu setDropMenu={setDropMenu} />}
      </nav>
    </header>
  );
};

export default memo(Navbar);
