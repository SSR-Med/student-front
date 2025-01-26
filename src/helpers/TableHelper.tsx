// Schemas
import { searcherSchema } from "../schemas/TableSchema";
// Styles
import { textFieldStyle } from "../styles/TableStyle";
// Dependencies
import { TextField, InputAdornment} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export function createTextFieldWithIcon(searcherSchema: searcherSchema){
    return(
        <TextField sx={textFieldStyle}
            label="Search"
            value={searcherSchema.getter}
            onChange={(e) => searcherSchema.setter(e.target.value)}
            InputProps={{
                endAdornment:(
                    <InputAdornment position="end">
                        <SearchIcon/>
                    </InputAdornment>
                )
            }}
        />
    )
}