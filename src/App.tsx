// import { useState } from 'react'
import "./App.css";
import "./app-variables.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Error404 from "./pages/errors/404/Error404";
import TopBarLayer from "./layers/topbarlayer/TopBarLayer";
import { useState } from "react";
import Register from "./pages/register/Register";

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <div className={"app " + theme}>
      {/* <ThemeLayer> */}
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
        <Route path="*" element={<Error404 />}></Route>
      </Routes>
      {/* </ThemeLayer> */}
    </div>
  );
}

export default App;
