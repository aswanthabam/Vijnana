import './Event.css';

export default function Event({event,...props})
{
  return (
    <div className="event">
      <h3 className="heading">{event.name}</h3>
      <p className="description">{event.description}</p>
    </div>
  );
}