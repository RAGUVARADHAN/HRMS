import { useEffect, useState } from "react";
import type { Student } from "../../interface/student";
import axiosClient from "../../axiosClient";
import "./getstudent.css"
import { Link } from "react-router";
import { FaEdit } from "react-icons/fa";
import EditModal from '../Modal/editModal'
import { FaPlus } from "react-icons/fa";

export default function GetStudent() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,setError]=useState('');
  const [modal, showModal]=useState(false)
  const [editStudent,setEditStudent]=useState<Student | null>()

    const fetchStudents = async () => {
      try 
      {
        const response = await axiosClient.get('/student/get')
        setStudents(response.data.data);
      } 
      catch(error: any) 
      {
        if(error.response)
        {
          setError(error.response.data.detail)
          alert(error.response.data.detail)
        }
      } 
      finally 
      {
        setLoading(false);
      }
    };

    useEffect(()=>{
      fetchStudents();
    },[])


  const handleEdit=(student:any)=>{
    showModal(true)
    setEditStudent(student)
  }

  const handleCloseModal=()=>{
    showModal(false)
    setEditStudent(null)
  }

  if (loading) return <p className="loading">Loading students...</p>;
  if (error) return <p className="error">{error}</p>;

  if(students.length>0) 
  {
    return (
    <>
      <div className="container">
        <h2 className="title">Student List</h2>
        <div className="grid">
          {students.map((student) => (
            <div key={student.Id} className="card">
              <div>
                <p><strong>ID:</strong> {student.Id}</p>
                <p><strong>Name:</strong> {student.Name}</p>
                <p><strong>Email:</strong> {student.Email}</p>
              </div>
                <FaEdit className="edit-btn" onClick={()=>handleEdit(student)}/>
            </div>
          ))}
          <Link to='/add'><FaPlus className="add-btn"/></Link>
        </div>
      </div>

      <EditModal 
        show={modal}
        student={editStudent!}
        close={handleCloseModal}
        refresh={fetchStudents}
      />
    </>
    )
  }
  return(
  <>
    <h2 className="title">Student List</h2>
    <h3>No data found...</h3>
    <Link to='/add'>Add</Link>
  </>);
}
