import "./App.css";
import "./app-variables.css";
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
import Login from "./pages/login/Login";
import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import { LoginStatus } from "./apis/api";
import { GoogleIdentity, isLoggedIn } from "./utils/utils";
import WhatsappIcon from "./components/whatsapp/Whatsapp";
import Launch from "./pages/launch/launch";
import LaunchHome from "./pages/launch/Home";
import Admin from "./pages/admin/Admin";
import NewEvent from "./pages/admin/admin_pages/new_event/NewEvent";
import ViewEvent from "./pages/admin/admin_pages/view_events/ViewEvents";
import UserList from "./pages/admin/admin_pages/users_list/UserList";
import RequestLog from "./pages/admin/admin_pages/request_log/RequestLog";
import ErrorLog from "./pages/admin/admin_pages/error_log/ErrorLog";
import AddAdmin from "./pages/admin/admin_pages/add_admin/AddAdmin";
import AboutVijnana from "./pages/admin/admin_pages/about/AboutVijnana";
import Participants from "./pages/admin/admin_pages/view_events/participants";
import { RegisterEvent } from "./pages/register/events/RegisterEvents";
import { CryptaQuest } from "./pages/CryptaQuest/CryptaQuest";
import { Leaderboard } from "./pages/CryptaQuest/CryptaLeaderboard";

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
  var { addLoader } = useLoader();
  var { setToastStatus } = useToast();
  const [sidebarState, setSidebarState] = useState<boolean>(false);
  const redirect = useNavigate();
  const setTheme = (theme: string) => {
    setThemeState(theme);
    localStorage.setItem("theme", theme);
  };
  var location = useLocation();
  useEffect(() => {
    var the = getTheme();
    setTheme(the);
    GoogleIdentity.initializeGoogleIdentity();
    GoogleIdentity.setCallBack(async (e: any) => {
      console.log(e);
      var status = await createAccountGoogle(
        e["credential"],
        addLoader,
        setToastStatus
      );
      console.log(status);
      if (status == LoginStatus.STEP1) redirect("/register/details");
      else if (status == LoginStatus.STEP2) {
        redirect("/register/events");
      }
    });
    if (
      location.pathname != "/dashboard" &&
      location.pathname != "/register/details" &&
      !isLoggedIn()
    ) {
      console.log("Trigger google one tap");
      // GoogleIdentity.showGoogleOneTapPopup();
    }
  }, []);

  return (
    <div className={"app " + theme}>
      <div id="google-login-button-hidden"></div>
      <Toast />
      <TopLoader />
      <Sidebar state={sidebarState} setState={setSidebarState} />
      <Routes>
        <Route
          path="/v1"
          element={
            <>
              <WhatsappIcon />
              <Outlet />
            </>
          }
        >
          <Route
            path=""
            element={
              <TopBarLayer
                sidebarState={sidebarState}
                setSidebarState={setSidebarState}
                setTheme={setTheme}
                theme={theme}
              >
                <Home />
              </TopBarLayer>
            }
          ></Route>
          <Route
            path="about"
            element={
              <TopBarLayer
                sidebarState={sidebarState}
                setSidebarState={setSidebarState}
                setTheme={setTheme}
                theme={theme}
              >
                <About />
              </TopBarLayer>
            }
          ></Route>
          <Route path="register">
            <Route
              path=""
              element={
                <TopBarLayer
                  sidebarState={sidebarState}
                  setSidebarState={setSidebarState}
                  setTheme={setTheme}
                  theme={theme}
                  showLogoutButton={false}
                >
                  <Register />
                </TopBarLayer>
              }
            ></Route>
            <Route
              path="details"
              element={
                <TopBarLayer
                  sidebarState={sidebarState}
                  setSidebarState={setSidebarState}
                  setTheme={setTheme}
                  theme={theme}
                >
                  <RegisterStep2 />
                </TopBarLayer>
              }
            ></Route>
            <Route
              path="events"
              element={
                <TopBarLayer
                  sidebarState={sidebarState}
                  setSidebarState={setSidebarState}
                  setTheme={setTheme}
                  theme={theme}
                >
                  <RegisterEvent />
                </TopBarLayer>
              }
            ></Route>
          </Route>
          <Route path="login" element={<Login />}></Route>
          <Route
            path="events"
            element={
              <TopBarLayer
                sidebarState={sidebarState}
                setSidebarState={setSidebarState}
                setTheme={setTheme}
                theme={theme}
              >
                <Events />
              </TopBarLayer>
            }
          ></Route>
          <Route
            path="contact"
            element={
              <TopBarLayer
                sidebarState={sidebarState}
                setSidebarState={setSidebarState}
                setTheme={setTheme}
                theme={theme}
              >
                <Contact />
              </TopBarLayer>
            }
          ></Route>
          <Route
            path="dashboard"
            element={
              <TopBarLayer
                sidebarState={sidebarState}
                setSidebarState={setSidebarState}
                setTheme={setTheme}
                theme={theme}
              >
                <Dashboard />
              </TopBarLayer>
            }
          ></Route>
          <Route
            path="event/:eventId"
            element={
              <TopBarLayer
                sidebarState={sidebarState}
                setSidebarState={setSidebarState}
                setTheme={setTheme}
                theme={theme}
              >
                <Event />
              </TopBarLayer>
            }
          ></Route>

          <Route path="launch" element={<Launch />}></Route>
          <Route
            path="home"
            element={
              // <TopBarLayer
              //   sidebarState={sidebarState}
              //   setSidebarState={setSidebarState}
              //   setTheme={setTheme}
              //   theme={theme}
              // >
              <LaunchHome />
              // </TopBarLayer>
            }
          ></Route>
          <Route path="admin" element={<Admin />}>
            <Route path="" element={<NewEvent />}></Route>
            <Route path="about/" element={<AboutVijnana />}></Route>
            <Route path="admin/new" element={<AddAdmin />}></Route>
            <Route path="events/" element={<ViewEvent />}></Route>
            <Route path="events/new" element={<NewEvent />}></Route>
            <Route path="users/" element={<UserList />}></Route>
            <Route path="logs/request" element={<RequestLog />}></Route>
            <Route path="logs/error" element={<ErrorLog />}></Route>
            <Route path="participants/:id/" element={<Participants />}></Route>
          </Route>
        </Route>
        <Route path="/cq" element={<CryptaQuest />}></Route>
        <Route path="/cq/leaderboard" element={<Leaderboard />}></Route>
        <Route path="*" element={<Error404 />}></Route>
      </Routes>
    </div>
  );
}

export default App;
