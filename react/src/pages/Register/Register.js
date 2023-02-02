import './Register.css';
import {useEffect,useState} from "react";
import LoginButton from '../../components/LoginButton/LoginButton';
import {createUser, login} from "../../services/LoginService";
import { useSelector, useDispatch} from 'react-redux';
import { loginUser,logoutUser } from '../../actions/index'; 
//import {useLogin} from '../../helper';
import {useNavigate} from "react-router-dom";
import {useNotification,useLogin} from "../../helper";
import {useTopBar} from "../../helper";

export default function Register({user=null,setUser})
{
  const [showForm,setShowForm] = useState(false);
  const [showLogin,setLogin] = useState(false);
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  //const [curUser,login,logout] = useLogin();
  const redirect = useNavigate();
  const showNotification = useNotification();
  const [hideLogin] = useTopBar();
  const [,userLogin,userLogout] = useLogin();
  useEffect(()=>{
    hideLogin();
    // eslint-disable-next-line
  },[]);
  const handleLoginSubmit = async() => {
    await login(user).then(async (res)=>{
      if(res.data.status === 200){
        setUser({
          ...user,
          is_logged:true
        });
        dispatch(loginUser({
          user:{
            email:null,
            name: null,
            picture:null,
            phone: null,
            dob:null,
            course:null,
            ...res.data.content
          },
          is_logged:true
        }));
        //onLogin(user);
        userLogin({email:user.email,...res.data.content});
        showNotification("Logged In Successfully ","success");
        redirect("/dashboard");
      }else{
        showNotification(res.data.description,"warning");
        setUser({email:user.email||null,password:user.password||null});
        dispatch(logoutUser());
        userLogout();
      }
    }).catch(err=>{
      showNotification("An error occured!","error");
      console.log(err);
      setUser({email:user.email||null,password:user.password||null});
      dispatch(logoutUser());
      userLogout();
    });
  }
  const handleEmailSubmit = e =>{
    setUser({...user,picture:"https://proxy.builtbybit.com/cb741efede439838b1dd201ebb329b8122d99387?url=https%3A%2F%2Fcdn.discordapp.com%2Fattachments%2F780127473802280993%2F787695766046900274%2FBlizzardPfp.png"});
    dispatch(logoutUser());
    setShowForm(false);
  }
  const handleSubmit = e =>{
    e.preventDefault();
    createUser(user).then(responce =>{
      if(responce.status === 200){
        dispatch(loginUser({
            user:{
              email:user.email,
              name:user.name,
              picture:user.picture,
              phone: user.phone,
              dob:user.dob,
              course:user.course,
              ...responce.data.content
            },
            is_logged:true
          }));
        userLogin({email:user.email,...responce.data.content});
        showNotification("User Created Successfully ");
        redirect("/dashboard");
      }else {
        userLogout();
      }
    }).catch(err =>{
      userLogout();
    });
  }
  return (
    <div className="register">
      {( showForm && showLogin )&& <form className="form" onSubmit={(e)=>{e.preventDefault();handleLoginSubmit();}}>
         <h3 className="center underlined">Login</h3>
         <div className="form-item">
          <input onChange={(e)=>{
           // user.phone = e.target.value;
            setUser({...user,email:e.target.value});
          }} type="email" placeholder=" " required></input>
          <label>Email ID *</label>
        </div>
         <div className="form-item">
          <input onChange={(e)=>{
           // user.phone = e.target.value;
            setUser({...user,password:e.target.value});
          }} type="password" placeholder=" " required></input>
          <label>Password *</label>
        </div>
        <button>Login</button><br/>
        <span className="text" onClick={()=>{setLogin(false);setUser(null);}}>Not Registered? <u>Register</u></span>
        <span className="text" onClick={()=>{setShowForm(false);setLogin(false);setUser(null);}}>Continue with <u>Google</u></span>
      </form> }
      {( showForm && !showLogin )&& <form className="form" onSubmit={(e)=>{e.preventDefault();handleEmailSubmit();}}>
         <h3 className="center underlined">Register</h3>
         <div className="form-item">
          <input onChange={(e)=>{
           // user.phone = e.target.value;
            setUser({...user,name:e.target.value});
          }} type="text" placeholder=" " required></input>
          <label>Full Name *</label>
        </div>
         <div className="form-item">
          <input onChange={(e)=>{
           // user.phone = e.target.value;
            setUser({...user,email:e.target.value});
          }} type="email" placeholder=" " required></input>
          <label>Email ID *</label>
        </div>
         <div className="form-item">
          <input onChange={(e)=>{
           // user.phone = e.target.value;
            setUser({...user,password:e.target.value});
          }} type="password" placeholder=" " required></input>
          <label>Password *</label>
        </div>
        <button>Continue</button>
        <br/>
        <span className="text" onClick={()=>{setLogin(true);setUser(null);}}>Already Registered? <u>Login</u></span>
        <span className="text" onClick={()=>{setShowForm(false);setLogin(false);setUser(null);}}>Continue with <u>Google</u></span>
      </form> }
      { ((!user || state.is_logged) && !showForm) && <div className="login">
        <h3 className="center underlined">Register to Vijñāna</h3>
        <LoginButton must={true}/>
        <span>Or</span>
        <div onClick={()=>{setShowForm(true);setUser(null)}} className="email-btn">
          Continue with E-mail
        </div>
      </div> }
      { (!state.is_logged && user && !showForm) && 
      <form onSubmit={handleSubmit} className="form">
        <div className="header">
          <img alt="Profile" src={user.picture} width="50px" height="50px"></img>
          <span>{user.email}</span>
        </div>
        <h3> Welcome {user.name}</h3>
        <p>We need a few more details about you for completing the registration. Please fill out the following details to complete the registration</p>
        <input name="email" value={user.email} hidden="true"></input>
        <input name="picture" value={user.picture} hidden="true"></input>
        <input name="aud" value={user.aud} hidden="true"></input>
        <div className="form-item">
          <input value={user.name} onChange={(e)=>{
           // user.phone = e.target.value;
            setUser({...user,name:e.target.value});
          }} type="text" name="name" placeholder=" " required></input>
          <label>Name (Change if any mistakes)</label>
        </div>
        <div className="form-item">
          <input onChange={(e)=>{
           // user.phone = e.target.value;
            setUser({...user,phone:e.target.value});
          }} type="number" name="phone" placeholder=" " required></input>
          <label>Phone (Same as WhatsApp number)*</label>
        </div>
        <div className="form-item">
          <select onChange={(e)=>{
            setUser({
              ...user,
              course:e.target.value
            });
          }}  name="department" required>
            <option value="" disabled={true} selected>Course *</option>
            <option value="bca">BCA</option>
            <option value="ba">BA History</option>
            <option value="bcom">BCom</option>
            <option value="msc">MSc Computer Science</option>
          </select>
        </div>
        <button>Register</button>
      </form> }
    </div>
  );
}