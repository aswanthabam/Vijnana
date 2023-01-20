import './Event.css';

export default function Event({event,...props})
{
  var date = event.date.toLocaleString("en-us", {
    hour12: true,
    weekday: "short",
    hour: "numeric",
    month: "short",
    day:"numeric",
    minute:"numeric"
  });
  return (
    <div className="event">
      <p className="type"><span>{event.type}</span></p>
      <img className="image" src={event.image}/>
      <h3 className="heading">{event.name}</h3>
      <p className="date"><span>{ ""+date}</span></p>
      <p className="description">{event.description}</p>
    </div>
  );
}