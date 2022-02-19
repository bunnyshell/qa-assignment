import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { deleteUser ,getallUsers } from '../service/api';
import { useHistory } from 'react-router-dom';
import { DataGrid  } from '@mui/x-data-grid';

const AllUsers = () => {

    const history = useHistory(),
    [user, setUser] = useState([]);
    
    useEffect(() => {
        getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    const delay = ms => new Promise(res => setTimeout(res, ms)),
    getUsers = async () =>{
        const response = await getallUsers();
        setUser(response.data);
        console.log(user)
    },
    deleteData = async (id) => {
        await delay(2000)
        await deleteUser(id);
        getUsers();
    },
    columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'username', headerName: 'UserName', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phone', headerName: 'Phone', width: 200 },
        { 
            field: 'actions', 
            headerName: 'Actions', 
            width: 300,
            sortable: false,
            renderCell: (params) => {
                const onRemove = (e) => {
                    e.stopPropagation(); // don't select this row after clicking
            
                    const api = params.api;
                    const thisRow = {};
            
                    api
                    .getAllColumns()
                    .filter((c) => c.field !== "__check__" && !!c)
                    .forEach(
                        (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                    );
            
                    return deleteData(thisRow.id);
                },
                onEdit = (e) => {
                    e.stopPropagation(); // don't select this row after clicking
            
                    const api = params.api;
                    const thisRow = {};
                    api
                    .getAllColumns()
                    .filter((c) => c.field !== "__check__" && !!c)
                    .forEach(
                        (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                    );
            
                    return history.push(`/edit/${thisRow.id}`)
                };
        
                return (
                    <>
                        <Button qa-data="EditButton" variant="contained" color="primary" style={{margin: '0px 20px'}} onClick={onEdit}>Edit</Button>
                        <Button qa-data="RemoveButton" variant="contained" color="secondary" style={{margin: '0px 20px'}} onClick={onRemove}>Remove</Button>
                    </>
                );
            } 
        },
      ]

    return (
        <>
        <div style={{ height: 700, width: '100%' }}>
        <DataGrid qa-data="DataGrid"
             rows={user}
             columns={columns}
             initialState={{
                 sorting: {
                 sortModel: [{ field: 'name', sort: 'desc' }],
                 },
             }}
         />
         </div>
        </>

    )
}

export default AllUsers;
