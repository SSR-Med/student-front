// Dependencies
import { Dialog, DialogContent, DialogTitle,DialogActions,
    TextField, Button} from "@mui/material";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router";
// Styles
import { crudDialogButton, crudDialogTextField } from "../../styles/CrudStyle";
// Helpers
import { addStudent4Course } from "../../helpers/API/CourseAPI";

export default function CrudStudent4Course(open:boolean,setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    modifyRow:Record<string,any>|null, request: string
){
    const {id} = useParams<{id:string}>()
    // Variables
    // Title & Button
    const title = "Add student to course"
    // States
    const [studentId, setStudentId] = useState<number>(0)
    // Change value of states if request is PUT
    useEffect(() => {
        if (request === "PUT" && open) {
            if(modifyRow != null){
                // Set values
                setStudentId(modifyRow.id)
            }
            else{
                setOpen(false)
                Swal.fire({
                    title: "Error",
                    text: "No item selected",
                    icon: "error",
                    confirmButtonText: "Accept"
                })
            }
        }
        else{
            setStudentId(0)
        }
    },[open,modifyRow])
    return (
        <Dialog
        open={open}
        onClose={() => setOpen(false)}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
            <TextField
                fullWidth
                type = "number"
                value={studentId}
                onChange={(e) => setStudentId(parseFloat(e.target.value))}
                variant="filled" label="Student Id" sx={crudDialogTextField}/>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" sx={crudDialogButton} onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="contained" sx={crudDialogButton}
                    onClick={() => {
                        addStudent4Course(Number(id),studentId)
                    }}>{title}</Button>
            </DialogActions>
        </Dialog>   
    )
}