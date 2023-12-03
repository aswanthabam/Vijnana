import "./Form1.css";

export default function Form1({onSubmit,children}){
  
  return (
    <form className="form1" onSubmit={(e)=>{e.preventDefault();onSubmit();}}>
      {children}
    </form>
  );
}