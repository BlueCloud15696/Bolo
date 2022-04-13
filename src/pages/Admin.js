import { useState } from "react";
import SideBar from "../admin/SideBar";
import NavBar from "../admin/NavBar";
import Developer from "../admin/Developers";
import AdminUsers from "../admin/AdminUsers";
import Messages from "../admin/Messages";
import ThemeConfig from "../theme";
import GlobalStyles from "../theme/globalStyles";
import PrivateRoutes from "../components/PrivateRoutes";

const Admin = () => {
  const [currentPage, setCurrentPage] = useState("developers");
  return (
    <ThemeConfig>
      <GlobalStyles />
      <PrivateRoutes
        element={
          <div
            style={{
              display: "flex",
              height: "100%",
              overflow: "hidden",
              width: "100%",
            }}
          >
            <SideBar
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <NavBar />
              <div
                style={{
                  backgroundColor: "#f9fafc",
                  display: "flex",
                  flex: "1 1 auto",
                  overflow: "scroll",
                  paddingTop: 40,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flex: "1 1 auto" /*  overflow: "scroll" */,
                  }}
                >
                  <div
                    style={{
                      flex: "1 1 auto",
                      height: "100%" /* overflow: "auto" */,
                    }}
                  >
                    {currentPage === "developers" ? (
                      <Developer />
                    ) : currentPage === "messages" ? (
                      <Messages />
                    ) : currentPage === "admin-users" ? (
                      <AdminUsers />
                    ) : (
                      <h1>Not Implemented</h1>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        requiredRoles={["ADMIN"]}
      />
    </ThemeConfig>
  );
};

export default Admin;
