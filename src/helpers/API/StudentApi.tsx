import axios from "axios";
import { GridColDef } from "@mui/x-data-grid";

import Swal from "sweetalert2";

import { API_URL } from "../../components/Constant";

export const columnsStudent: GridColDef[] = [
    {field: "id", headerName: "ID", flex:1},
    {field: "name", headerName: "Name", flex:1},
    {field: "email", headerName: "Email", flex:1}
]

export async function createStudent(reqBody: Record<string, any>){
    try{
        const response = await axios.post(`${API_URL}/student`,reqBody)
        Swal.fire({
            icon: "success",
            title: "Student created",
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

export async function getStudents(){
    try{
        const response = await axios.get(`${API_URL}/student`)
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

export async function modifyStudent(reqBody: Record<string, any>){
    try{
        const id = reqBody.id
        delete reqBody.id
        const response = await axios.put(`${API_URL}/student/${id}`,reqBody)
        Swal.fire({
            icon: "success",
            title: "Student modified",
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

export async function deleteStudent(id: number){
    try{
        const response = await axios.delete(`${API_URL}/student/${id}`)
        Swal.fire({
            icon: "success",
            title: "Student deleted",
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

export async function getCourse4Student(id:number){
    try{
        const response = await axios.get(`${API_URL}/student/${id}/courses`)
        return response.data
    } catch (error:any){
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data.message
        })
    }
}

export async function getStudent(id:number){
    try{
        const response = await axios.get(`${API_URL}/student/${id}`)
        return response.data
    } catch (error:any){
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data.message
        })
    }
}