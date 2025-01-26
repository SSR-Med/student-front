import axios from "axios";
import { GridColDef } from "@mui/x-data-grid";

import Swal from "sweetalert2";

import { API_URL } from "../../components/Constant";

export const columnsCourse: GridColDef[] = [
    {field: "id", headerName: "ID", flex:1},
    {field: "name", headerName: "Name", flex:1},
    {field: "studentMax", headerName: "Student Max", flex:1},
    {field: "credits", headerName: "Credits", flex:1}
]

export async function createCourse(reqBody: Record<string, any>){
    try{
        const response = await axios.post(`${API_URL}/course`,reqBody)
        Swal.fire({
            icon: "success",
            title: "Course created",
            text: response.data.message
        })
    } catch (error:any){
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data.message
        })
    }
}

export async function getCourses(){
    try{
        const response = await axios.get(`${API_URL}/course`)
        console.log(response.data)
        return response.data
    } catch (error:any){
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data.message
        })
    }
}

export async function getCourse(id:number){
    try{
        const response = await axios.get(`${API_URL}/course/${id}`)
        return response.data
    } catch (error:any){
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data.message
        })
    }
}

export async function modifyCourse(reqBody: Record<string, any>){
    try{
        const id = reqBody.id
        delete reqBody.id
        const response = await axios.put(`${API_URL}/course/${id}`,reqBody)
        Swal.fire({
            icon: "success",
            title: "Course modified",
            text: response.data.message
        })
    } catch (error:any){
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data.message
        })
    }
}

export async function deleteCourse(id:number){
    try{
        const response = await axios.delete(`${API_URL}/course/${id}`)
        Swal.fire({
            icon: "success",
            title: "Course deleted",
            text: response.data.message
        })
    } catch (error:any){
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data.message
        })
    }
}

export async function getStudent4Course(id:number){
    try{
        const response = await axios.get(`${API_URL}/course/${id}/students`)
        return response.data
    } catch (error:any){
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data.message
        })
    }
}

export async function removeStudent4Course(id:number, studentId:number){
    try{
        const response = await axios.patch(`${API_URL}/course/${id}/students?studentId=${studentId}&type=remove`)
        Swal.fire({
            icon: "success",
            title: "Student removed",
            text: response.data.message
        })
    }catch (error:any){
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data.message
        })
    }
}

export async function addStudent4Course(id:number, studentId:number){
    try{
        const response = await axios.patch(`${API_URL}/course/${id}/students?studentId=${studentId}&type=add`)
        Swal.fire({
            icon: "success",
            title: "Student added",
            text: response.data.message
        })
    }catch (error:any){
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data.message
        })
    }
}