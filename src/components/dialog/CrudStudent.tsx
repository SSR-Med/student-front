// Dependencies
import { Dialog, DialogContent, DialogTitle,DialogActions,
    TextField, Button} from "@mui/material";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
// Styles
import { crudDialogButton, crudDialogTextField } from "../../styles/CrudStyle";
// Helpers
import { createStudent, modifyStudent } from "../../helpers/API/StudentApi";


export default function CrudStudent(open:boolean,setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    modifyRow:Record<string,any>|null, request: string
){
    // Variables
    // Title & Button
    const title = request == "POST" ? "Create student": "Modify student"
    // States
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    // Change value of states if request is PUT
    useEffect(() => {
        if (request === "PUT" && open) {
            if(modifyRow != null){
                // Set values
                setName(modifyRow.name)
                setEmail(modifyRow.email)
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
            setEmail("")
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="filled" label="Email" sx={crudDialogTextField}/>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" sx={crudDialogButton} onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="contained" sx={crudDialogButton}
                    onClick={() => {
                        const requestData = {
                            name: name,
                            email: email
                        };
                        if (modifyRow != null && request === "PUT") {
                            modifyStudent({...requestData, id: modifyRow.id});
                        } else {
                            createStudent(requestData);
                        }
                    }}>{title}</Button>
            </DialogActions>
        </Dialog>   
    )
}