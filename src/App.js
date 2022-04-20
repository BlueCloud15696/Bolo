// import css
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/poppins";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TalentPool from "./pages/TalentPool";
import Questions from "./pages/Questions";
import Admin from "./pages/Admin";
import { AuthContext } from "./auth-context";

import { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { BASE_URL } from "./constants/constants";

function App() {
  const [authState, setAuthState] = useState(null);
  console.log(
    'localStorage.getItem("accessTokenBolo")',
    localStorage.getItem("accessTokenBolo")
  );
  const checkAuth = () => {
    axios
      .get(`${BASE_URL}/api/auth/`, {
        headers: {
          accessTokenBolo: localStorage.getItem("accessTokenBolo"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          if (authState) {
            setAuthState({
              ...authState,
              status: false,
            });
          } else {
            setAuthState({
              role: null,
              email: "",
              uid: 0,
              email_verified: null,
              status: false,
            });
          }
        } else {
          const user = response.data.results.user;
          if (user) {
            setAuthState({
              role: user.role,
              email: user.email,
              uid: user._id,
              email_verified: user.email_verified,
              status: true,
            });
          } else {
            setAuthState({
              role: null,
              email: "",
              uid: 0,
              email_verified: null,
              status: false,
            });
          }
        }
      })
      .catch((err) => {
        setAuthState({
          role: null,
          email: "",
          uid: 0,
          email_verified: null,
          status: false,
        });
      });
  };

  useEffect(() => {
    checkAuth();
  });

  const logout = () => {
    localStorage.removeItem("accessTokenBolo");
    setAuthState({
      role: null,
      email: "",
      uid: 0,
      email_verified: null,
      status: false,
    });
  };
  console.log(authState);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setAuthState={setAuthState}
              authState={authState}
              logout={logout}
            />
          }
        />
        <Route path="/talent-pool" element={<TalentPool />} />
        <Route path="/hire-developer" element={<Questions />} />
        <Route
          path="/admin"
          element={
            !authState ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  height: "100%",
                  flexGrow: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress
                  variant="indeterminate"
                  disableShrink
                  style={{
                    color: "#00AB55",
                    animationDuration: "550ms",
                    position: "absolute",
                    marginTop: "46%",
                  }}
                  size={40}
                  thickness={4}
                />
              </div>
            ) : (
              <AuthContext.Provider value={{ authState, setAuthState, logout }}>
                <Admin />
              </AuthContext.Provider>
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
