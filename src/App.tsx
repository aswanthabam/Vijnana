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
import { LoaderStateProvider } from "./components/toploader/useLoader";
import Events from "./pages/events/Events";
import Event from "./pages/event/Event";

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
  useEffect(() => {
    var the = getTheme();
    setTheme(the);
  }, []);

  return (
    <div className={"app " + theme}>
      <LoaderStateProvider>
        {/* <ThemeLayer> */}
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
          <Route
            path="/register"
            element={
              <TopBarLayer setTheme={setTheme} theme={theme}>
                <Register />
              </TopBarLayer>
            }
          ></Route>
          <Route
            path="/events"
            element={
              <TopBarLayer setTheme={setTheme} theme={theme}>
                <Events />
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
      </LoaderStateProvider>
      {/* </ThemeLayer> */}
    </div>
  );
}

export default App;
