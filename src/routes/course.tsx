import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

import Menu from "../components/menu";
import CrudCourse from "../components/dialog/CrudCourse";
import { searchValues, dataTable } from "../components/TableComponent";

import { columnsCourse, deleteCourse, getCourses } from "../helpers/API/CourseAPI";
import filterSearch from "../helpers/FilterSearch";

import { crudButtonStyle } from "../styles/TableStyle";

export default function Course(){

    const navigate = useNavigate()

    const [selectValue, setSelectValue] = useState<string>("")
    const [searchValue, setSearchValue] = useState<string>("")
    const [selectedRow, setSelectedRow] = useState<Record<string,any> | null>(null)

    const [rows, setRows] = useState<Array<Record<string,any>>>([])
    // State for crud
    const [open, setOpen] = useState<boolean>(false)
    // Request state for crud
    const [request, setRequest] = useState<string>("POST")

    const mapSelectValuesSearch: Record<string,string> = {
        "name": "string",
    }


    useEffect(() =>{
        getCourses().then((data:Array<Record<string,any>>) => {
            setRows(filterSearch(
                data,
                mapSelectValuesSearch[selectValue],
                selectValue,
                searchValue))
        })
    },[searchValue,open,selectedRow])

    return <>
        <Menu />
        {CrudCourse(open,setOpen,selectedRow,request)}
        <main>
            <h1>Course Config</h1>
            <Button variant="contained" sx={crudButtonStyle} onClick={
                () => {
                    setOpen(true)
                    setRequest("POST")
                }
            }>Create</Button>
            {searchValues({
                selectMap: {
                    "name": "Name",
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
                columns: columnsCourse,
                setSelectedRowSchema: setSelectedRow
            })}
            <div className="crud-buttons">
            <Button variant="contained" sx={crudButtonStyle}
            onClick = {() => {
                setRequest("PUT")
                setOpen(true)
            }}
            >Modify</Button>
            <Button variant="contained" sx={crudButtonStyle} onClick={
                () => {
                    if(selectedRow != null){
                        deleteCourse(Number(selectedRow.id))
                }}
            }>Delete</Button> 
            <Button variant="contained" sx={crudButtonStyle}
                onClick={() => {
                    if(selectedRow != null){
                        navigate(`/course/${selectedRow.id}/students`)
                }}}
            >Students</Button>
            </div>
        </main>

    </>
}