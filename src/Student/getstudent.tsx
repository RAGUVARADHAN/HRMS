import { useEffect, useState } from "react";
import type { Student } from "../interface/student";
import axiosClient from "../axiosClient";
import "./getstudent.css"

export default function GetStudent() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,setError]=useState('');

  useEffect(() => {
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
          console.log(error.response)
          setError(error.response.data.detail)
          alert(error.response.data.detail)
        }
      } 
      finally 
      {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

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
              <p><strong>ID:</strong> {student.Id}</p>
              <p><strong>Name:</strong> {student.Name}</p>
              <p><strong>Email:</strong> {student.Email}</p>
            </div>
          ))}
        </div>
      </div>
    </>
    )
  }
  return(
  <>
    <h2 className="title">Student List</h2>
    <h3>No data found...</h3>
  </>);
}
