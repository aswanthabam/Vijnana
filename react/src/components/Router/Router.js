import {Routes,Route,useNavigate} from 'react-router-dom';
import Login from "../../pages/Admin/Login/Login";
import Admin from "../../pages/Admin/Admin";
import AdminRoute from "../../pages/Admin/AdminRoute";
import Home from '../../pages/HomePage/Home';
import Register from '../../pages/Register/Register';
import Dashboard from '../../pages/Dashboard/Dashboard';
import PageNotFound from '../../pages/ErrorPages/PageNotFound/PageNotFound';
import CreateEvent from "../../pages/Admin/CreateEvent/CreateEvent"
import Participants from "../../pages/Admin/Participants/Participants"
import Event from "../../pages/Event/Event"
import Events from "../../pages/Events/Events"
export default function Router({user,setUser=null}){
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/register" element={<Register user={user} setUser={setUser}/>}/>
      <Route path="/event/:id" element={<Event />}/>
      <Route path="/events" element={<Events />}/>
      <Route path="/admin" element={<AdminRoute/>}>
        <Route index element={<Admin/>}/>
        <Route path="create-event" element={<CreateEvent/>}/>
        <Route path="edit-event/:id" element={<CreateEvent edit={true}/>}/>
        <Route path="participants/:id" element={<Participants/>}/>
      </Route>
      <Route path="admin_login" element={<Login/>}/>
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
  );
}