import React, { useState, useContext } from "react";

import {
  Navbar,  
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,  
  NavbarText,
} from "reactstrap";
import { AuthContext } from "../auth-context";
import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  /* const [collapse, setCollapse] = useState(false);
  const bgBlack = { backgroundColor: "#000000", color: "#f4f4f4" }; */

  const onClickLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{ width: "100%" }}>
      <Navbar
        style={{
          backgroundColor: "#ffffff",
          color: "#fff",
          boxShadow: "rgb(100 116 139 / 12%) 0px 1px 4px",
        }}
        className="py-3 px-5 text-white"
        light
        expand="md"
        fixed=""
        full
      >
        {/* <NavbarBrand href="/">reactstrap</NavbarBrand> */}
        <NavbarToggler /* onClick={function noRefCheck() {}}  */ />
        <Collapse navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink style={{ color: "#000", fontWeight: "600" }} href="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Why us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Vetting process</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/talent-pool">Talent pool</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Company</NavLink>
            </NavItem>
          </Nav>
          <NavbarText onClick={onClickLogout} style={{ cursor: "pointer" }}>
            Sign Out
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};
export default NavbarComponent;
