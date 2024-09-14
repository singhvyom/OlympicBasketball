import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const DataTable = ({rows, columns})=>{

    return(
        
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
        
    
    )
    

}
export default DataTable;