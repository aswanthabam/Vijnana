import "./Participants.css";
import {useEffect,useState} from "react";
import {useNotification,useAdmin} from "../../../helper"
import {getEvent} from "../../../services/EventServices"
import {useParams} from "react-router-dom";

export default function Participants(){
  const [event,setEvent] = useState({loaded:false});
  const showNotification = useNotification();
  const [token] = useAdmin();
  const {id=null} = useParams();
  useEffect(()=>{
    getEvent(id,token).then(res=>{
      if(res.data.status === 200){
        showNotification(res.data.description,"success");
        setEvent({...res.data.content,loaded:true});
      }else {
        showNotification(res.data.description,"warning");
        setEvent({loaded:true});
      }
    }).catch(err=>{
      setEvent({loaded:true});
      showNotification("Error fetching event data");
    })
    // eslint-disable-next-line
  },[token]);
  const printDocument = ()=> {
    const input = document.getElementById('pdfCont');
    /*html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("Participant List ("+event.name+").pdf");
      })
    ;*/
    var a = window.open('', '', 'height=500, width=500'); 
    a.document.write('<html>'); 
    a.document.write("<style>table td {"+
  "min-width: 100px;border: 1px solid #121212;padding: 5px; white-space: nowrap;}</style>");
    a.document.write(input.innerHTML);
    a.document.write('</body></html>'); 
    a.document.close(); 

    a.print(); 
  }
  return (
    <div className="participants-page">
     <div id="pdfCont">
     {event.loaded && <>
     <center><h3>Participants List</h3>
     <h4 className="underlined">{event.name}</h4></center>
       </>
     }
      {event.loaded && <table>
       <tr>
         <td><b>User ID</b></td>
         <td><b>Name</b></td>
         <td><b>Course</b></td>
         <td><b>Email</b></td>
         <td><b>Phone</b></td>
         <td><b>Remarks</b></td>
         <td><b>S/D</b></td>
       </tr>
        { event.participants.map(user=><tr>
          <td>{user.userId}</td>
          <td>{user.name}</td>
          <td>{user.course}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td></td>
          <td></td>
        </tr>) }
      </table>}
      </div>
      <span onClick={printDocument}>Print</span>
    </div>
  )
}