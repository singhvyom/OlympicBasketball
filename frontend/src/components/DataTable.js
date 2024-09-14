import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const DataTable = ({rows, columns})=>{

    return(
        // <Box sx={{ height: 700, width: '85%'}} >
        <div style={{height: 700, width: '75%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                intialState={{
                    pagination:{
                        paginationModel:{
                            pageSize: 10,
                         },
                     },
                }}
                pageSizeOptions={[3,5,10]}
                disableRowSelectionOnClick
            />
        </div>
        // </Box>
    
    )
    

}
export default DataTable;