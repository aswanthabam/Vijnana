import './Register.css';
import {useState} from "react";
import LoginButton from '../../components/LoginButton/LoginButton';
import {createUser} from "../../services/LoginService";
import { useSelector, useDispatch} from 'react-redux';
import { loginUser } from '../../actions/index'; 
import {useLogin} from '../../helper';
export default function Register({user=null,setUser})
{
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const [curUser,login,logout] = useLogin();
  const handleSubmit = e =>{
    e.preventDefault();
    createUser(user.email,user.name,user.picture,user.phone,user.dob,user.course,user.aud).then(responce =>{
      if(responce.status == 200){
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
        login({email:user.email,...responce.data.content});
      }else {
        logout();
      }
    }).catch(err =>{
      logout();
    });
  }
  return (
    <div className="register">
      { (!user || state.is_logged) && <div className="login"><LoginButton must={true}/></div> }
      { (!state.is_logged && user) && 
      <form onSubmit={handleSubmit} className="form">
        <div className="header">
          <img src={user.picture} width="50px" height="50px"></img>
          <span>{user.email}</span>
        </div>
        <h3> Welcome {user.name}</h3>
        <p>We need a few more details about you for completing the registration. Please fill out the following details to complete the registration</p>
        <input name="name" value={user.name} hidden="true"></input>
        <input name="email" value={user.email} hidden="true"></input>
        <input name="picture" value={user.picture} hidden="true"></input>
        <input name="aud" value={user.aud} hidden="true"></input>
        <div className="form-item">
          <input onChange={(e)=>{
           // user.phone = e.target.value;
            setUser({...user,phone:e.target.value});
          }} type="number" name="phone" placeholder=" " required></input>
          <label>Phone (Same as WhatsApp number)*</label>
        </div>
        <div className="form-item double">
          <input onChange={(e)=>{
            setUser({
              ...user,
              dob:e.target.value
            });
          }}  onFocus={(elem)=>{
            elem.currentTarget.parentElement.lastChild.click();
          }} type="text" name="dob" placeholder=" " required></input>
          <label>Date of birth *</label>
          <input onChange={(elem)=>{
            elem.currentTarget.parentElement.firstChild.value = elem.currentTarget.value;
             setUser({
               ...user,
               dob:elem.target.value
             });
          }} type="date"></input>
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
          </select>
        </div>
        <button>Register</button>
      </form>
      }
    </div>
  );
}