import { useRef, useState } from "react";
import type { Student } from "../../interface/student"
import './editModal.css'
import axiosClient from "../../axiosClient";

interface EditModalProps {
  show: boolean;
  student: Student;   
  close: () => void;
  refresh:()=>void;
}

const EditModal:React.FC<EditModalProps>= ({
  show,student,close,refresh
})=>
  {
     const name=useRef<HTMLInputElement>(null)
     const email=useRef<HTMLInputElement>(null)
     const [loading, setLoading] = useState(false)

  const handleUpdate=async ()=>{
    try{
      setLoading(true)
      const payload={
        Id:student.Id,
        Name:name.current?.value,
        Email:email.current?.value
      }
      const response= await axiosClient.put('/student/update',payload)
      if(response.status==200)
      {
        await refresh()
        close()
      }
    }
    catch(error:any){
      if(error.response)
      alert(error.response.data.detail)
    }
    finally
    {
      setLoading(false)
    }
  }

  if(!show) return null 

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h3>Edit Student</h3>
        <div className='modal-body'>
          <input ref={name} defaultValue={student.Name}/>
          <input ref={email} defaultValue={student.Email}/>
        </div>
        <button 
          className='close-button' 
          onClick={handleUpdate}
          disabled={loading}
        >{loading?"Updating...":"Update"}
        </button>
      </div>
    </div>
  )
}

export default EditModal
