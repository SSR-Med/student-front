import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useParams } from "react-router";

import Menu from "../components/menu";
import { searchValues, dataTable } from "../components/TableComponent";
import CrudStudent4Course from "../components/dialog/CrudStudent4Course";

import { columnsStudent } from "../helpers/API/StudentApi";
import filterSearch from "../helpers/FilterSearch";
import { getStudent4Course, removeStudent4Course, getCourse } from "../helpers/API/CourseAPI";

import { crudButtonStyle } from "../styles/TableStyle";

export default function Student4Course(){

    const {id} = useParams<{id:string}>()

    const [selectValue, setSelectValue] = useState<string>("")
    const [searchValue, setSearchValue] = useState<string>("")
    const [selectedRow, setSelectedRow] = useState<Record<string,any> | null>(null)

    const [course, setCourse] = useState<Record<string,any> | null>(null)

    const [rows, setRows] = useState<Array<Record<string,any>>>([])
    // State for crud
    const [open, setOpen] = useState<boolean>(false)
    // Request state for crud
    const [request, setRequest] = useState<string>("POST")

    const mapSelectValuesSearch: Record<string,string> = {
        "name": "string",
        "email": "email"
    }


    useEffect(() =>{
        getStudent4Course(Number(id)).then((data:Array<Record<string,any>>) => {
            setRows(filterSearch(
                data,
                mapSelectValuesSearch[selectValue],
                selectValue,
                searchValue))
        })
        getCourse(Number(id)).then((data:Record<string,any>) => {
            setCourse(data)
        })
    },[searchValue,open,selectedRow])

    return <>
        <Menu />
        {CrudStudent4Course(open,setOpen,selectedRow,request)}
        <main>
            <h1>Students 4 Course Config</h1>
            <h2>Course Name: {course ? course.name : "Loading..."}</h2>
            <Button variant="contained" sx={crudButtonStyle} onClick={
                () => {
                    setOpen(true)
                    setRequest("POST")
                }
            }>Add student 2 Course</Button>
            {searchValues({
                selectMap: {
                    "name": "Name",
                    "email": "Email"
                },
                searchState: {
                    getter: searchValue,
                    setter: setSearchValue
                },
                selectState: {
                    getter: selectValue,
                    setter: setSelectValue
                }
            })}
            {dataTable({
                rows: rows,
                columns: columnsStudent,
                setSelectedRowSchema: setSelectedRow
            })}
            <div className="crud-buttons">
            <Button variant="contained" sx={crudButtonStyle} onClick={
                () => {
                    if(selectedRow != null){
                        removeStudent4Course(Number(id),Number(selectedRow.id))
                        setSelectedRow(null)
                }}
            }>Remove Student</Button> 
            </div>
        </main>

    </>
}