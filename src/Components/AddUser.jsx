import React, { useState } from 'react';
import { Container, Typography, FormControl, InputLabel, Input, Box, FormGroup, Button } from '@material-ui/core';
import { addUser } from '../service/api';
import { useHistory } from 'react-router-dom';

const initialValue = {
    name: "",
    username : "",
    email: "",
    phone: "",
}

const AddUser = () => {

    const [user, setUser] = useState(initialValue);
    const {name, username, email, phone} = user;

    const history = useHistory();

    const onValueChange = (e) =>
    {
        setUser({...user, [e.target.name]: e.target.value});
        console.log(user);
    }

    const addUserDetails = async () =>{
       await addUser(user);
       history.push('/all');
    }

    return (
        <Container maxWidth="sm">
            <Box my={5}>
            <Typography variant="h5" align="center">Add User Details</Typography>
            <FormGroup>
                <FormControl required>
                    <InputLabel>Name</InputLabel>
                    <Input qa-data="name" onChange={(e) => onValueChange(e)} name="name" value={name} required/>
                </FormControl>
                <FormControl required>
                    <InputLabel>User Name</InputLabel>
                    <Input qa-data="userName" onChange={(e) => onValueChange(e)} name="username" value={username} required/>
                </FormControl>
                <FormControl required>
                    <InputLabel>Email address</InputLabel>
                    <Input qa-data="email" onChange={(e) => onValueChange(e)} name="email" value={email} required/>
                </FormControl>
                <FormControl>
                    <InputLabel>Phone Number</InputLabel>
                    <Input qa-data="phoneNumber" onChange={(e) => onValueChange(e)} name="phone" value={phone} />
                </FormControl>
                <Box my={3}>
                    <Button qa-data="submit" variant="contained" onClick={() => addUserDetails() } color="primary" align="center">Add User</Button>
                    <Button onClick={()=> history.push("/all")} variant="contained" color="secondary" align="center" style={{margin: '0px 20px'}}>Cancel</Button>
                </Box>
            </FormGroup>
            </Box>
        </Container>
    )
}


export default AddUser;