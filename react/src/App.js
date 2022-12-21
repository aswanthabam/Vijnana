import './App.css';
import {Routes,Route} from 'react-router-dom';
import Home from './pages/HomePage/Home';
import PageNotFound from './pages/ErrorPages/PageNotFound/PageNotFound';
import Main from './components/Main/Main';
function App() {
  return (
    <Main>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </Main>
  );
}

export default App;
