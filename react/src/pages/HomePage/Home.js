import './Home.css';
import Header from '../../components/Header/Header'
import Events from '../../components/EventsContainer/Events'
export default function Home(){
  return(
    <div className="Home">
      <Header/>
      <Events id="main"/>
    </div>
  );
}