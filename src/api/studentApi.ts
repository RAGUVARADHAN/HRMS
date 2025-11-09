import type { Student } from "../interface/student";
import axiosClient from "../axiosClient";


export const getStudents=async():Promise<Student[]>=>{
  const response=await axiosClient.get<Student[]>('/get')
  return response.data;
}

