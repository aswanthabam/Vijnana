import "./AdminRoute.css";
import {Outlet} from "react-router-dom";
import {useEffect,useState} from "react";
import {useAdmin} from "../../helper"
import {useSelector,useDispatch} from "react-redux"
import {setAdmin} from "../../actions/index"
import {useNavigate,Navigate} from "react-router-dom";
import {isAdmin} from "../../services/AdminService";

export default function AdminRoute(){
 // const [admin,setAdmin] = useState(null);
  const dispatch = useDispatch();
  const admin = useSelector(state => state.admin);
  const redirect = useNavigate();
  const [token,login,logout] = useAdmin();
  useEffect(()=>{
    if(token != null) {
      dispatch(setAdmin(true,token));
    //  redirect("/admin_login");
      return;
    }
    else dispatch(setAdmin(false,token));
    /*
    isAdmin(token).then(res=>{
      if(res.data.status == 200){
        dispatch(setAdmin(true,token));
      }else {
        dispatch(setAdmin(false,token));
        //redirect("/admin/login");
      }
    }).catch(err=>{
      dispatch(setAdmin(false,token));
     // redirect("/admin/login");
    });*/
  },[token]);
  return (
    <div className="admin-route">
    {token && <Outlet/>}
    {!token && <Navigate to="/admin_login" replace={true}/>}
    </div>
  )
  
}