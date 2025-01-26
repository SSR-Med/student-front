// Dependencies
import { Dialog, DialogContent, DialogTitle,DialogActions,
    TextField, Button} from "@mui/material";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
// Styles
import { crudDialogButton, crudDialogTextField } from "../../styles/CrudStyle";
// Helpers
import { createCourse, modifyCourse } from "../../helpers/API/CourseAPI";


export default function CrudCourse(open:boolean,setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    modifyRow:Record<string,any>|null, request: string
){
    // Variables
    // Title & Button
    const title = request == "POST" ? "Create course": "Modify Course"
    // States
    const [name, setName] = useState<string>("")
    const [studentMax, setStudentMax] = useState<number>(0)
    const [credits, setCredits] = useState<number>(0)
    // Change value of states if request is PUT
    useEffect(() => {
        if (request === "PUT" && open) {
            if(modifyRow != null){
                // Set values
                setName(modifyRow.name)
                setStudentMax(modifyRow.studentMax)
                setCredits(modifyRow.credits)
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
            setName("")
            setStudentMax(0)
            setCredits(0)
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="filled" label="Name" sx={crudDialogTextField}/>
                <TextField
                fullWidth
                type = "number"
                value={studentMax}
                onChange={(e) => setStudentMax(parseFloat(e.target.value))}
                variant="filled" label="Max students" sx={crudDialogTextField}/>
                <TextField
                fullWidth
                value={credits}
                type= "number"
                onChange={(e) => setCredits(parseInt(e.target.value))}
                variant="filled" label="Credits" sx={crudDialogTextField}/>

            </DialogContent>
            <DialogActions>
                <Button variant="contained" sx={crudDialogButton} onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="contained" sx={crudDialogButton}
                    onClick={() => {
                        const requestData = {
                            name: name,
                            studentMax: studentMax,
                            credits: credits
                        };
                        if (modifyRow != null && request === "PUT") {
                            modifyCourse({...requestData, id: modifyRow.id});
                        } else {
                            createCourse(requestData);
                        }
                    }}>{title}</Button>
            </DialogActions>
        </Dialog>   
    )
}