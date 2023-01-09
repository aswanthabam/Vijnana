import "./Notification.css";

export default function Notification({visible=false,type="info",text}){
  var icon;
  switch(type){
    case "info":
       icon = "bi bi-info"
       break;
     default:icon = "bi bi-info"
  }
  return (
    <div className={"notification "+type+" "+(visible ? "": "gone")}>
      <span className="icon">
        <i class={icon}></i>
      </span>
      <span className="text">
         {text}
      </span>
    </div>
  );
}