import "./Participants.css";
import {useEffect,useState} from "react";
import {useNotification,useAdmin} from "../../../helper"
import {getEvent} from "../../../services/EventServices"
import {useParams} from "react-router-dom";

export default function Participants(){
  const [event,setEvent] = useState({loaded:false});
  const [contents,setContents] = useState({
    userId:true,
    name:true,
    course:true,
    email:true,
    phone:true,
    date:true,
    remarks:false,
    sd:true,
    year:true
  });
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
     <span>Display Items</span><br/>
     <div className="item">
       <input checked={contents.userId} onChange={e=>{
         setContents({...contents,userId:e.currentTarget.checked});
       }} type="checkbox" ></input><label>User ID</label>
     </div>
     <div className="item">
       <input checked={contents.name} onChange={e=>{
         setContents({...contents,name:e.currentTarget.checked});
       }} type="checkbox" /><label>Name</label>
     </div>
     <div className="item">
       <input checked={contents.course} onChange={e=>{
         setContents({...contents,course:e.currentTarget.checked});
       }} type="checkbox" /><label>Course</label>
     </div>
     <div className="item">
       <input checked={contents.year} onChange={e=>{
         setContents({...contents,year:e.currentTarget.checked});
       }} type="checkbox" /><label>Year</label>
     </div>
     <div className="item">
       <input checked={contents.email} onChange={e=>{
         setContents({...contents,email:e.currentTarget.checked});
       }} type="checkbox" /><label>Email ID</label>
     </div>
     <div className="item">
       <input checked={contents.phone} onChange={e=>{
         setContents({...contents,phone:e.currentTarget.checked});
       }} type="checkbox" /><label>Phone</label>
     </div>
     <div className="item">
       <input checked={contents.date} onChange={e=>{
         setContents({...contents,date:e.currentTarget.checked});
       }} type="checkbox" /><label>Registered On</label>
     </div>
     <div className="item">
       <input checked={contents.remarks} onChange={e=>{
         setContents({...contents,remarks:e.currentTarget.checked});
       }} type="checkbox" /><label>Remarks Column</label>
     </div>
     <div className="item">
       <input checked={contents.sd} onChange={e=>{
         setContents({...contents,sd:e.currentTarget.checked});
       }} type="checkbox" /><label>Sign Column</label>
     </div>
     <div id="pdfCont"><center>
     {event.loaded && <>
     <h3>Participants List</h3>
     <h2 className="underlined">{event.name}</h2>
     <hr/><br/>
       </>
     }
      {event.loaded && <table>
       <tr>
         { contents.userId && <td><b>User ID</b></td> }
         { contents.name && <td><b>Name</b></td> }
         { contents.course && <td><b>Course</b></td> }
         { contents.year && <td><b>Year</b></td> }
         { contents.email && <td><b>Email</b></td> }
         { contents.phone && <td><b>Phone</b></td> }
         { contents.date && <td><b>Reg. On</b></td> }
         { contents.remarks && <td><b>Remarks</b></td> }
         { contents.sd && <td><b>S/D</b></td> }
       </tr>
        { event.participants.map(user=><tr>
          { contents.userId && <td>{user.userId}</td> }
          { contents.name && <td>{user.name}</td> }
          { contents.course && <td>{user.course}</td> } 
          { contents.year && <td>{user.year}</td> } 
          { contents.email && <td>{user.email}</td> }
          { contents.phone && <td>{user.phone}</td> }
          { contents.date && <td>{new Date(user.date).toLocaleString("en-us", {
                hour12: true,
                hour: "numeric",
                month: "short",
                day:"numeric",
                minute:"numeric",
                year:"numeric"
              })}</td> }
          { contents.remarks && <td></td> }
          { contents.sd && <td></td> }
        </tr>) }
      </table>}</center>
      </div>
      <button onClick={printDocument}>Print</button>
    </div>
  )
}