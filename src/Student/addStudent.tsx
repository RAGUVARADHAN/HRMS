import { useState } from "react";
import "./addstudent.css"
import axiosClient from "../axiosClient";

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
      setName('')
      setEmail('')
      console.log(response)
    }
    catch(error:any){
      if(error.response)
      {
        alert(error.response.data.detail)
      }
      console.log(error)
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
  </div>
  )
}
