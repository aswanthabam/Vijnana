import './App.css';
import {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Main from './components/Main/Main';
import jwt_decode from "jwt-decode";
import {login} from "./services/LoginService";
import {useDispatch} from 'react-redux';
import { loginUser,logoutUser,googleScriptLoaded} from './actions/index';
import { useLogin,useNotification,useSidebar} from "./helper";
import SideBar from "./components/SideBar/SideBar";
import Router from "./components/Router/Router";
import PreLoader from "./components/PreLoader/PreLoader";

function App() {
  const [sidebar] = useSidebar();
  const dispatch = useDispatch();
  const [user,setUser] = useState(null);
  const [preloader,setPreLoader] = useState({visible:false,text:"Loading ..."});
  const redirect = useNavigate();
  const [curUser,userLogin,userLogout] = useLogin();
  const showNotification = useNotification();
  const clientId = "1025507377861-ksv14u42p6c0bes203hkbki7n56u6v80.apps.googleusercontent.com";
  //const [cookies,setCookie] = useCookies(["user"]);
  
  useEffect(() => {
    if(typeof window === "undefined" || !window.google)  return;
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse
    });
    dispatch(googleScriptLoaded(true));
    var logg = curUser.is_logged;
    
    if(!logg) window.google.accounts.id.prompt();
    else{
      setUser({
        userId:curUser.userId,
        email:curUser.email,
        token:curUser.token,
        expiry:curUser.expiry
      });
      dispatch(loginUser({
        user:{
          userId:curUser.userId,
          email:curUser.email,
          token:curUser.token,
          expiry:curUser.expiry
        },
        is_logged:logg
      }));
    }
    // eslint-disable-next-line
  },[curUser,dispatch]);
  
  
  const handleCredentialResponse = async (responce) =>{
    setPreLoader({visible:true,text:"Registering ..."});
    var data = jwt_decode(responce.credential);
    if(data.aud === clientId){
      
      var reg = false;
      await login(data).then(async (res)=>{
       // showNotification(JSON.stringify(res.data),"error",false);
        if(res.data.status === 200){
          setUser({
            is_logged:true
          });
          reg = true;
          dispatch(loginUser({
            user:{
              email:data.email,
              name:data.name,
              picture:data.picture,
              phone: data.phone,
              dob:data.dob,
              course:data.course,
              ...res.data.content
            },
            is_logged:true
          }));
          //onLogin(user);
          userLogin({email:data.email,...res.data.content});
          showNotification("Logged In Successfully ","success");
          setPreLoader({visible:false,text:"Registering ..."});
          redirect("/dashboard");
        }else{
          setUser({});
          dispatch(logoutUser());
          userLogout();
          reg = false;
        }
      }).catch(err=>{
        showNotification("An error occured!","error");
        console.log(err);
        setUser({});
        dispatch(logoutUser());
        userLogout();
        reg = false;
      });
      
      if(!reg) {
        dispatch(logoutUser());
        setUser({
          email:data.email,
          name:data.name,
          picture:data.picture,
          phone: null,
          dob:null,
          course:null,
          is_logged:false,
          token:null,
          aud:data.aud,
        });
        setPreLoader({visible:false,text:"Registering ..."});
        return redirect("/register");
      }
      setPreLoader({visible:false,text:"Registering ..."});
    }else {
      setPreLoader({visible:false,text:"Registering ..."});
      showNotification("Error with google!","error");
    }
  };
  
  return (
    <div className={"App"+(sidebar.visible ? "opened":"closed")}>
      <PreLoader visible={preloader.visible} text={preloader.text}/>
      <SideBar />
      <Main className={""+(sidebar.visible ? "opened":"closed")}>
        {/*<h6 onClick={()=>{showNotification("Hello","info")}} className="underlined">{JSON.stringify(state)}</h6>*/}
        <Router user={user} setUser={setUser}/>
        
      </Main>
    </div>
  );
}

export default App;
