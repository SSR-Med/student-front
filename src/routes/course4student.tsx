import { useEffect, useState } from "react";
import { useParams } from "react-router";

import Menu from "../components/menu";
import { searchValues, dataTable } from "../components/TableComponent";

import { columnsCourse } from "../helpers/API/CourseAPI";
import { getCourse4Student, getStudent } from "../helpers/API/StudentApi";
import filterSearch from "../helpers/FilterSearch";

export default function Course4Student(){

    const {id} = useParams<{id:string}>()

    const [selectValue, setSelectValue] = useState<string>("")
    const [searchValue, setSearchValue] = useState<string>("")
    const [selectedRow, setSelectedRow] = useState<Record<string,any> | null>(null)

    const [rows, setRows] = useState<Array<Record<string,any>>>([])

    const [student, setStudent] = useState<Record<string,any> | null>(null)

    const mapSelectValuesSearch: Record<string,string> = {
        "name": "string",
    }


    useEffect(() =>{
        getCourse4Student(Number(id)).then((data:Array<Record<string,any>>) => {
            setRows(filterSearch(
                data,
                mapSelectValuesSearch[selectValue],
                selectValue,
                searchValue))
        })
        getStudent(Number(id)).then((data:Record<string,any>) => {
            setStudent(data)
        })

    },[searchValue,open,selectedRow])

    return <>
        <Menu />
        <main>
            <h1>Courses 4 Student Config</h1>
            <h2>Student Name: {student ? student.name : "Loading..."}</h2>
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
        </main>

    </>
}