// Css

// Dependencies
import { FormControl, InputLabel, Select, MenuItem,
} from "@mui/material";
import { DataGrid, GridRowId,
   GridToolbarContainer, GridToolbarExport
} from '@mui/x-data-grid';
import { useState} from "react";
// Styles
import { selectFieldStyle } from "../styles/TableStyle";
// Schemas
import { searchValuesSchema,tableSchema } from "../schemas/TableSchema";
// Helpers
import { createTextFieldWithIcon } from "../helpers/TableHelper";

export function searchValues(searchValuesSchema: searchValuesSchema){
   return(
       <div className="search-table-container">
           <FormControl sx={selectFieldStyle}>
               <InputLabel>Filter By...</InputLabel>
               <Select
                   value = {searchValuesSchema.selectState.getter}
                   onChange = {(e) => searchValuesSchema.selectState.setter(e.target.value)}
               >
                   {Object.keys(searchValuesSchema.selectMap).map((key) => {
                       return <MenuItem value={key}>{searchValuesSchema.selectMap[key]}</MenuItem>
                   })}
               </Select>
           </FormControl>
           {createTextFieldWithIcon(searchValuesSchema.searchState)}
       </div>
   )
}

function CustomToolBar():JSX.Element{
   return (
       <GridToolbarContainer>
           <GridToolbarExport
               csvOptions={{
                   allColumns: true,
                   delimiter: ';'
               }}
           />
       </GridToolbarContainer>
   )
}

export function dataTable(tableSchema: tableSchema){
   const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
   return(
       <div className="table">
           <DataGrid
           rows= {tableSchema.rows}
           columns = {tableSchema.columns}
           initialState={{
               pagination: {
                 paginationModel: { page: 0, pageSize: 5 },
               },
           }}
           pageSizeOptions={[5, 10]}
           slots={{
               toolbar: CustomToolBar
           }}
           checkboxSelection
           disableColumnMenu
           slotProps={{ pagination: { labelRowsPerPage: 'Rows per page' }
           }}
           rowSelectionModel={selectionModel}
           hideFooterSelectedRowCount
           onRowSelectionModelChange={(selection:any) => {
               const selectedId = selection.slice(-1)[0]
               const selectedRow = tableSchema.rows.filter(
                   (row) => row.id === selectedId
               )[0]
               tableSchema.setSelectedRowSchema(selectedRow)
               if (selection.length > 1) {
               const selectionSet = new Set(selectionModel);
               const result = selection.filter((s:any) => !selectionSet.has(s));
               setSelectionModel(result);
               } else {
               setSelectionModel(selection);
               }
           }}
           />
       </div>
   )
}