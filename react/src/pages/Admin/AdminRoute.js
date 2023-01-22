import "./AdminRoute.css";
import {Outlet} from "react-router-dom";
import {useEffect,useState} from "react";
import {useAdmin,useTopBar} from "../../helper"
//import {useSelector,useDispatch} from "react-redux"
//import {setAdmin} from "../../actions/index"
import {useNavigate,Navigate} from "react-router-dom";
import {isAdmin} from "../../services/AdminService";

export default function AdminRoute(){
 const [admin,setAdmin] = useState({is_admin:false,loaded:false});
 const [hideTopBar] = useTopBar();
//  const dispatch = useDispatch();
  // const admin = useSelector(state => state.admin);
  const redirect = useNavigate();
  const [token,login] = useAdmin();
  useEffect(()=>{
    hideTopBar();
    /*if(token != null) {
      dispatch(setAdmin(true,token));
    //  redirect("/admin_login");
      return;
    }
    else dispatch(setAdmin(false,token))
    */
    if(token === null && (login === null || login === undefined)) {
      setAdmin({...admin,token:token,loaded:true,is_admin:false});
      return;
    }
    isAdmin(token).then(res=>{
     // setAdmin({...admin,loaded:true);
      if(res.data.status === 200){
        setAdmin({...admin,token:token,loaded:true,is_admin:res.data.content.valid});
        //dispatch(setAdmin(true,token));
      }else {
        setAdmin({...admin,token:token,loaded:true,is_admin:false});
       // dispatch(setAdmin(false,token));
        redirect("/admin_login");
      }
    }).catch(err=>{
      setAdmin({...admin,token:token,loaded:true,is_admin:false});
      redirect("/admin_login");
    });
    // eslint-disable-next-line
  },[token]);
  return (
    <div className="admin-route">
    {!admin.loaded && <span>Loading admin panel...</span>}
    {admin.is_admin && admin.loaded && <Outlet/>}
    {!admin.is_admin && admin.loaded && <Navigate to="/admin_login" replace={true}/>}
    </div>
  )
  
}