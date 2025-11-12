import { useState } from "react";
import "./addstudent.css"
import axiosClient from "../../axiosClient";
import { Link } from "react-router";

export default function AddStudent() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  async function handleSubmit(e:React.FormEvent) {
    try{
      e.preventDefault()
      const response= await axiosClient.post(
        '/student/add',
        {
          Name:name,
          Email:email
        }
      )
      if(response.status==200)
      {
        setName('')
        setEmail('')
      }
    }
    catch(error:any){
      if(error.response)
      {
        alert(error.response.data.detail)
      }
    }
  }

  return (
    <div className="form-container">
    <h2>Add Student</h2>
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter student name"
          required
        />
      </div>

      <div className="input-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter student email"
          required
        />
      </div>
      <button type="submit">Add</button>
    </form>
    <Link to='/'>View</Link>
  </div>
  )
}
