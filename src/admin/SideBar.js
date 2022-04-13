import React, { useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import logo from "../img/logo.png";

const Sidebar = ({ currentPage, setCurrentPage }) => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "scroll initial",
      }}
    >
      <CDBSidebar textColor="#d1d5db" backgroundColor="#111827">
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
          <div
            className="container"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img src={logo} alt="" style={{ width: "50px" }} />
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              Bolo Admin
            </a>
          </div>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            {/* <NavLink exact to="#" activeClassName="activeClicked">
              <CDBSidebarMenuItem
                onClick={() => setCurrentPage("dashboard")}
                active={currentPage === "dashboard"}
                icon="chart-line"
              >
                Dashboard
              </CDBSidebarMenuItem>
            </NavLink> */}
            <NavLink exact to="#" activeClassName="activeClicked">
              <CDBSidebarMenuItem
                onClick={() => setCurrentPage("developers")}
                active={currentPage === "developers"}
                icon="user"
              >
                Developers
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="#" activeClassName="activeClicked">
              <CDBSidebarMenuItem
                onClick={() => setCurrentPage("messages")}
                active={currentPage === "messages"}
                icon="list"
              >
                Client Messages
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="#" activeClassName="activeClicked">
              <CDBSidebarMenuItem
                onClick={() => setCurrentPage("admin-users")}
                active={currentPage === "admin-users"}
                icon="user-plus"
              >
                Admin Users
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          >
            Copyright © Bolo 2022
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
