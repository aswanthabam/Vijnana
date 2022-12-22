import './App.css';
import {Routes,Route} from 'react-router-dom';
import Home from './pages/HomePage/Home';
import Register from './pages/Register/Register';
import PageNotFound from './pages/ErrorPages/PageNotFound/PageNotFound';
import Main from './components/Main/Main';
import { useGoogleOneTapLogin } from '@react-oauth/google';


function App() {
  useGoogleOneTapLogin({
  onSuccess: credentialResponse => {
    console.log(credentialResponse);
  },
  onError: () => {
    console.log('Login Failed');
  },
});
  return (
    <Main>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </Main>
  );
}

export default App;
