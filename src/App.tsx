// import { useState } from 'react'
import "./App.css";
import "./app-variables.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Error404 from "./pages/errors/404/Error404";
import TopBarLayer from "./layers/topbarlayer/TopBarLayer";
import { useState, useEffect } from "react";
import Register from "./pages/register/Register";
import TopLoader from "./components/toploader/TopLoader";
import { useLoader } from "./components/toploader/useLoader";
import Events from "./pages/events/Events";
import Event from "./pages/event/Event";
import Contact from "./pages/contact/Contact";
import { useToast } from "./components/toast/useToast";
import Toast from "./components/toast/Toast";
import { createAccountGoogle } from "./apis/userApi";
import RegisterStep2 from "./pages/register/RegisterStep2";

function getTheme() {
  var theme = localStorage.getItem("theme");
  if (theme == null) {
    localStorage.setItem("theme", "dark");
    return "dark";
  } else if (theme == "light") {
    return "light";
  } else {
    return "dark";
  }
}
function App() {
  const [theme, setThemeState] = useState("dark");
  const setTheme = (theme: string) => {
    setThemeState(theme);
    localStorage.setItem("theme", theme);
  };
  var { setLoaderStatus } = useLoader();
  var { setToastStatus } = useToast();
  useEffect(() => {
    var the = getTheme();
    setTheme(the);
    var script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    // console.log(script);
    script.defer = true;
    script.async = true;
    script.onload = (data) => {
      console.log(data);
      (window as any).google.accounts.id.initialize({
        client_id:
          "1025507377861-ksv14u42p6c0bes203hkbki7n56u6v80.apps.googleusercontent.com",
        callback: async (e: any) => {
          console.log(e);
          await createAccountGoogle(
            e["credential"],
            setLoaderStatus,
            setToastStatus
          );
        },
      });
      (window as any).google.accounts.id.prompt();
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className={"app " + theme}>
      {/* <ThemeLayer> */}
      <Toast />
      <TopLoader />
      <Routes>
        <Route
          path="/"
          element={
            <TopBarLayer setTheme={setTheme} theme={theme}>
              <Home />
            </TopBarLayer>
          }
        ></Route>
        <Route
          path="/about"
          element={
            <TopBarLayer setTheme={setTheme} theme={theme}>
              <About />
            </TopBarLayer>
          }
        ></Route>
        <Route path="/register">
          <Route path="" element={<Register />}></Route>
          <Route path="details" element={<RegisterStep2 />}></Route>
        </Route>
        <Route
          path="/events"
          element={
            <TopBarLayer setTheme={setTheme} theme={theme}>
              <Events />
            </TopBarLayer>
          }
        ></Route>
        <Route
          path="/contact"
          element={
            <TopBarLayer setTheme={setTheme} theme={theme}>
              <Contact />
            </TopBarLayer>
          }
        ></Route>
        <Route
          path="/event/:eventId"
          element={
            <TopBarLayer setTheme={setTheme} theme={theme}>
              <Event />
            </TopBarLayer>
          }
        ></Route>
        <Route path="*" element={<Error404 />}></Route>
      </Routes>
    </div>
  );
}

export default App;
