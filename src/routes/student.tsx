import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

import Menu from "../components/menu";
import CrudStudent from "../components/dialog/CrudStudent";
import { searchValues, dataTable } from "../components/TableComponent";

import { columnsStudent, deleteStudent, getStudents } from "../helpers/API/StudentApi";
import filterSearch from "../helpers/FilterSearch";

import { crudButtonStyle } from "../styles/TableStyle";


export default function Student(){

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
        "email": "email"
    }


    useEffect(() =>{
        getStudents().then((data:Array<Record<string,any>>) => {
            setRows(filterSearch(
                data,
                mapSelectValuesSearch[selectValue],
                selectValue,
                searchValue))
        })
    },[searchValue,open,selectedRow])

    return <>
        <Menu />
        {CrudStudent(open,setOpen,selectedRow,request)}
        <main>
            <h1>Student Config</h1>
            <Button variant="contained" sx={crudButtonStyle} onClick={
                () => {
                    setOpen(true)
                    setRequest("POST")
                }
            }>Create</Button>
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
            <Button variant="contained" sx={crudButtonStyle}
            onClick = {() => {
                setRequest("PUT")
                setOpen(true)
            }}
            >Modify</Button>
            <Button variant="contained" sx={crudButtonStyle} onClick={
                () => {
                    if(selectedRow != null){
                        deleteStudent(Number(selectedRow.id))
                        setSelectedRow(null)
                }}
            }>Delete</Button> 
            <Button variant="contained" sx={crudButtonStyle}
                onClick={() => {
                    if(selectedRow != null){
                        navigate(`/student/${selectedRow.id}/courses`)
                    }
                }}
            >Courses</Button>
            </div>
        </main>

    </>
}