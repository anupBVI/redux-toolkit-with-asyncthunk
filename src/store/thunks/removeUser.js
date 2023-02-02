import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const removeUser = createAsyncThunk('user/remove', async (user) => { 
   await axios.delete(`http://localhost:3004/users/${user.id}`)

    // FIX !!! 
    return user
 })

 export {removeUser}