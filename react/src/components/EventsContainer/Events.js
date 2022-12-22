import './Events.css';
import Event from '../Event/Event';
export default function Events(props){
  var events = [
    {
      id:19,
      name:"Inauguration",
      time:"10 Pm",
      date:"25th Aug",
      description:"Lest roll in to the mood..."
    },
    {
      id:19,
      name:"Exhibition",
      time:"10 Pm",
      date:"25th Aug",
      description:"Festive mood begins here.. Exhibition and shows of tech products and framework."
    }
  ];
  const {className = "",id = ""} = props;
  return (
    <div className={"events "+className} id={id}>
      <h3 className="underlined heading">Events</h3>
      {events.map(event => <Event event={event}/>)}
    </div>
  );
}